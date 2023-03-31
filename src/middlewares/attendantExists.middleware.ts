import { Request, Response, NextFunction } from "express";
import { Attendant } from "../entities/Attendant";
import AttendantRepository from "../repositories/Attendants";
import { ErrorHandler } from "../services/errors.service";

const attendantExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attendant: Attendant = await new AttendantRepository().getAttendant(
      req.params.attendantId
    );

    if (!attendant) {
      throw new ErrorHandler(404, "Atendente não encontrado");
    }
    req.attendant = attendant;
    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default attendantExists;
