import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../services/errors.service";
import UserRepository from "../repositories/Users";
import AttendantRepository from "../repositories/Attendants";

const fs = require("fs");

const checkUniqueKeys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mail, cpf_cnpj, permission } = req.validated;

    if (permission === 1) {
      const getUserByMail = await new UserRepository().getUserByMail(mail);
      const getUserByCpfCnpj = await new UserRepository().getUserByCpfCnpj(
        cpf_cnpj
      );
      if (getUserByMail || getUserByCpfCnpj) {
        throw new ErrorHandler(400, "Usuário já cadastrado.");
      }
    }

    if (permission === 0) {
      const getAttendantByMail =
        await new AttendantRepository().getAttendantByMail(mail);
      const getAttendantByCpfCnpj =
        await new AttendantRepository().getAttendantByCpfCnpj(cpf_cnpj);

      if (getAttendantByMail || getAttendantByCpfCnpj) {
        throw new ErrorHandler(400, "Atendente já cadastrado.");
      }
    }

    return next();
  } catch (e) {
    req.file && fs.unlinkSync(req.file.path);
    return res.status(e.statusCode || 400).json({ error: e.message });
  }
};

export default checkUniqueKeys;
