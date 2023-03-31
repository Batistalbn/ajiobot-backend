import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/Users";
import { ErrorHandler } from "../services/errors.service";
const fs = require("fs");

const adminPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.userId && !req.userId.id) {
      throw new ErrorHandler(401, "Acesso não autorizado");
    }

    const adminId = req.params.userId || req.userId.id;
    const admin = await new UserRepository().getUser(adminId);

    if (!admin && admin.permission !== 2) {
      throw new ErrorHandler(401, "Token não autorizado");
    }

    return next();
  } catch (e) {
    req.file && fs.unlinkSync(req.file.path);
    return res.status(e.statusCode || 401).json({ error: e.message });
  }
};

export default adminPermissions;
