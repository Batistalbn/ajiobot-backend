import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/Users";
import { ErrorHandler } from "../services/errors.service";

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().getUser(req.params.userId);

    if (!user) {
      throw new ErrorHandler(400, "Usuário não encontrado.");
    }

    req.user = user;

    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default userExists;
