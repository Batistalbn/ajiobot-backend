import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

import AttendantRepository from "../repositories/Attendants";
import { ErrorHandler } from "../services/errors.service";
import { Attendant } from "../entities/Attendant";
import UserRepository from "../repositories/Users";
import { serializedAttendantShape } from "../shapes/attendants.shape";
import { serializedUserShape } from "../shapes";
import { AppDataSource } from "../config/database";
import SectorRepository from "../repositories/Sectors";

export default class AttendantController {
  createAttendant = async (req: Request, res: Response) => {
    try {
      if (req.file) {
        req.validated.src = req.file.filename;
      }
      if (Number(req.params.userId) !== req.userId.id) {
        return res
          .status(401)
          .json({ error: "token não pertence a este userId" });
      }

      req.validated.user = req.params.userId;

      const attendant: Attendant =
        await new AttendantRepository().createAttendant(
          req.validated as Attendant
        );

      const attendantToReturn = JSON.parse(JSON.stringify(attendant));
      return res.status(201).json(
        await serializedAttendantShape.validate(attendantToReturn, {
          stripUnknown: true,
        })
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

  getAllAttendantsPaginate = async (req: Request, res: Response) => {
    try {
      const page = req.query.page || 1;
      const per_page = req.query.per_page || 10;

      const skip = (page - 1) * per_page;

      const attendants = await new AttendantRepository().getAttendantsByUser(
        req.userId.id,
        skip,
        per_page
      );
      const serializedAttendant = [];
      for (let i = 0; i < attendants.length; i++) {
        serializedAttendant.push(
          await serializedAttendantShape.validate(attendants[i], {
            stripUnknown: true,
          })
        );
      }

      const data = {
        page: page,
        attendants: serializedAttendant,
      };

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  getAllAttendants = async (req: Request, res: Response) => {
    try {
      const user = await new UserRepository().getUser(req.userId.id);

      const serializedUser = await serializedUserShape.validate(user, {
        stripUnknown: true,
      });
      return res.status(200).json(serializedUser.attendants);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

  getAttendant = async (req: Request, res: Response) => {
    try {
      const { attendant } = req;
      return res.status(200).json(
        await serializedAttendantShape.validate(attendant, {
          stripUnknown: true,
        })
      );
    } catch (e) {
      return res.status(e.statusCode || 400).json({ error: e.message });
    }
  };

  deleteAttendant = async (req: Request, res: Response) => {
    try {
      const findUser = await new UserRepository().getUser(req.userId.id);
      const { attendant } = req;

      const userAttendant = findUser.attendants.filter(
        (item) => item.id === attendant.id
      );

      if (!userAttendant.length) {
        throw new ErrorHandler(
          401,
          "Este atendente não pertence a este usuário."
        );
      }

      await new AttendantRepository().deleteAttendant(req.params.attendantId);

      return res.status(204).json();
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { mail, password } = req.validated;
      const attendant = await new AttendantRepository().getAttendantByMail(
        mail
      );

      if (!attendant) {
        throw new ErrorHandler(400, "E-mail e/ou senha inválidos");
      }

      const checkablePassword = compareSync(password, attendant.password);
      if (!checkablePassword) {
        throw new ErrorHandler(400, "E-mail e/ou senha inválidos");
      }
      const token = jwt.sign(
        {
          id: attendant.id,
          permission: attendant.permission,
          type: "attendant",
        },
        "xpto"
      );

      return res.status(200).send({ token });
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  putAttendant = async (req: Request, res: Response) => {
    try {
      await new AttendantRepository().updateAttendant(
        req.params.attendantId,
        req.validated
      );
      const attendant: Attendant = await new AttendantRepository().getAttendant(
        req.params.attendantId
      );
      return res.status(200).json({
        status: "Sucesso ao atualizar atendente!",
        data: await serializedAttendantShape.validate(attendant, {
          stripUnknown: true,
        }),
      });
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  addSectorOrRemoveSector = async (req: Request, res: Response) => {
    const { validated, attendant } = req;

    const sector = await new SectorRepository().getSector(validated.sector);
    if (!sector) {
      return res.status(404).json({ error: "Setor não encontrado" });
    }

    const attendantInSector = attendant.sector.filter(
      (item) => item.id === sector.id
    );
    if (validated.isAdd === true) {
      if (attendantInSector.length > 0) {
        return res.status(404).json({
          error: "Este atendente já está cadastrado nessse setor.",
        });
      }

      attendant.sector = [...attendant.sector, sector];
    } else {
      if (attendantInSector.length === 0) {
        return res.status(404).json({
          error: "Este atendente não está cadastrado nesse setor.",
        });
      }

      const removeSector = attendant.sector.filter(
        (item) => item.id !== sector.id
      );

      attendant.sector = removeSector;
    }

    await AppDataSource.getRepository(Attendant).save(attendant);

    const updateAttendant: Attendant =
      await new AttendantRepository().getAttendant(req.params.attendantId);

    return res.status(200).json(
      await serializedAttendantShape.validate(updateAttendant, {
        stripUnknown: true,
      })
    );
  };
}
