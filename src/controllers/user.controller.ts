import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { ErrorHandler } from "../services/errors.service";
import UserRepository from "../repositories/Users";
import { User } from "../entities/User";
import { serializedUserShape } from "../shapes";
import MessageRepository from "../repositories/Message";
import AttendantRepository from "../repositories/Attendants";
import ChatRepository from "../repositories/Chat";

export default class UserController {
  create = async (req: Request, res: Response) => {
    try {
      const user: User = await new UserRepository().create(
        req.validated as User
      );

      return res.status(201).json(
        await serializedUserShape.validate(user, {
          stripUnknown: true,
        })
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { mail, password } = req.validated;
      const user = await new UserRepository().getUserByMail(mail);

      if (!user) {
        throw new ErrorHandler(400, "E-mail inválido");
      }

      const checkablePassword = compareSync(password, user.password);
      if (!checkablePassword) {
        throw new ErrorHandler(400, "Senha inválida");
      }

      const token = jwt.sign(
        { id: user.id, permission: user.permission, type: 'user' },
        "xpto"
      );

      return res.status(200).send({ token });
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const { user } = req;

      if (user.permission === 0) {
        throw new ErrorHandler(
          401,
          "Você não tem permissão para acessar esse usuário."
        );
      }

      return res.status(200).send(
        await serializedUserShape.validate(user, {
          stripUnknown: true,
        })
      );
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  getUsers = async (_, res: Response) => {
    try {
      const result = await new UserRepository().getUsers();
      const users = result.filter((item) => item.permission !== 2);

      const serializedUser = [];
      for (let i = 0; i < users.length; i++) {
        serializedUser.push(
          await serializedUserShape.validate(users[i], { stripUnknown: true })
        );
      }

      return res.status(200).send(serializedUser);
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  getInfo = async (_, res: Response) => {
    try {
      const users = await new UserRepository().getUsers().then((item) => item.filter((item) => item.permission !== 2));
      const messages = await new MessageRepository().getMessages();
      const Attendants = await new AttendantRepository().getAttendants();
      const chats = await new ChatRepository().getChats();

      users.forEach((item) => { 
        delete item.attendants;
        delete item.sector;
        delete item.password;
        delete item.id;
        delete item.permission;
    })  


      const returno = {
        Attendants: Attendants.length,
        messages: messages.length,
        chats: chats.length,
        users: users
      }

      return res.status(200).send(returno);
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  getUserInfo = async (req: Request, res: Response) => {
    try {
      const { user } = req;
      const chats = await new ChatRepository().getChats();

      const messages = await new MessageRepository().getMessagesByUser(user.id);

      user.chats = 0

      for(let i=0; i < chats.length; i++){

        for(let j=0; j< user.attendants.length; j++){
          if(chats[i].attendant || user.attendants.id) if(chats[i].attendant.id === user.attendants[j].id) if(chats[i].concluded) user.chats++
        } 
      
    }

    user.attendants.forEach((item) => { 
      delete item.sector;
      delete item.password;
      delete item.id;
      delete item.permission;
      delete item.money;
  })  


    user.messages = messages.length;
    // user.attendants = user.attendants.length;
    user.sector = user.sector.length

    delete user.password;
    delete user.id;
    delete user.permission;




    //   const returno = {
    //     Attendants: Attendants.length,
    //     messages: messages.length,
    //     chats: chats.length,
    //     users: users
    //   }

      return res.status(200).send(user);
    } catch (e) {
      return res.status(e.statusCode || 400).json({ error: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      if (req.userId.id !== Number(req.params.userId))
        throw new ErrorHandler(401, "não é possível alterar outro usuário");
      const data = await new UserRepository().updateUser(
        req.params.userId,
        req.validated
      );
      if (!data.affected) {
        throw new ErrorHandler(404, "Usuário não encontrado");
      }

      const user = await new UserRepository().getUser(req.params.userId);

      return res.status(200).json(
        await serializedUserShape.validate(user, {
          stripUnknown: true,
        })
      );
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };
}
