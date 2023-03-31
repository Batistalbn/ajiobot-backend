import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import TokenController from "../controllers/token.controller";
import { ErrorHandler } from "../services/errors.service";
const fs = require("fs");

const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token;

    if (!token || token === "undefined") {

      throw new ErrorHandler(401, "Rota protegida, necessita de um token.");
    }
    const userToken = jwt.decode(token);

    if (!userToken) {

      throw new ErrorHandler(401, "Insira um token válido");
    }
    req.userId = userToken;
    return next();
  } catch (e) {
    req.file && fs.unlinkSync(req.file.path);
    return res.status(e.statusCode || 401).json({ error: e.message });
  }
};

export default validateAuth;
