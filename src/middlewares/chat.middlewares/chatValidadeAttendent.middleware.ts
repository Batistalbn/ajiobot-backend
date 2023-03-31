import { Request, Response, NextFunction } from "express";
import AttendantRepository from "../../repositories/Attendants";
import { ErrorHandler } from "../../services/errors.service";

const chatValidadeAttendent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attendent = await new AttendantRepository().getAttendant(
      req.params.id
    );

    if (!attendent) {
      throw new ErrorHandler(400, "attendent não existe.");
    }

    req.attendent = attendent;

    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default chatValidadeAttendent;
