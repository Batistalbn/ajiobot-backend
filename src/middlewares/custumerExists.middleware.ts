import { Request, Response, NextFunction } from "express";
import CustumerRepository from "../repositories/Custumer";
import { ErrorHandler } from "../services/errors.service";

const custumerExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const custumer = await new CustumerRepository().getCustumersByPhone(
      req.body.phone
    );

    if (!custumer) {
      throw new ErrorHandler(400, "Telefone já cadastrado.");
    }
    req.custumer = custumer;
    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default custumerExists;
