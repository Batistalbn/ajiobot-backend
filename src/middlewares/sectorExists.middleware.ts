import { Request, Response, NextFunction } from "express";
import UserRepository from "../repositories/Users";
import { ErrorHandler } from "../services/errors.service";

const sectorExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sector = await new UserRepository().getUser(req.userId.id);
    const sectorFilter = sector.sector.filter(
      (item) => item.id == req.params.id
    );

    if (!sectorFilter.length) {
      throw new ErrorHandler(404, "Setor não encontrado");
    }

    req.sector = sectorFilter;
    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default sectorExists;
