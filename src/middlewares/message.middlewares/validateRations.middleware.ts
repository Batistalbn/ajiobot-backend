import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ChatRepository from "../../repositories/Chat";
import CustumerRepository from "../../repositories/Custumer";

import { ErrorHandler } from "../../services/errors.service";
const fs = require("fs");

const validateRations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat =
      (await req.body.chat) && new ChatRepository().getChatsById(req.body.chat);

    if (!chat) {
      throw new ErrorHandler(400, "chat não encontrado.");
    }

    const customer =
      (await req.body.customer) &&
      new CustumerRepository().getCustumersById(req.body.customer);

    if (!customer) {
      throw new ErrorHandler(400, "customer não encontrado.");
    }

    req.chat = chat;
    req.customer = customer;

    return next();
  } catch (e) {
    req.file && fs.unlinkSync(req.file.path);
    return res.status(e.statusCode || 401).json({ error: e.message });
  }
};

export default validateRations;
