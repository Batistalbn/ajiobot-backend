import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/Users";
import { ErrorHandler } from "../services/errors.service";
const fs = require("fs");

const userPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId && !req.params.userId) {
      throw new ErrorHandler(401, "Não autorizado");
    }
    const userId = req.params.userId || req.userId.id;
    const user = await new UserRepository().getUser(userId);

    if (!user || user.permission !== 1) {
      throw new ErrorHandler(401, "Token não autorizado");
    }

    return next();
  } catch (e) {
    req.file && fs.unlinkSync(req.file.path);
    return res.status(e.statusCode || 401).json({ error: e.message });
  }
};

export default userPermissions;
