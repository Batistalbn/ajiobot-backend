import { Request, Response } from "express";
import { Sector } from "./../entities/Sector";

import SectorRepository from "../repositories/Sectors";
import { ErrorHandler } from "../services/errors.service";
import UserRepository from "../repositories/Users";

export default class SectorController {
  createSector = async (req: Request, res: Response) => {
    try {
      req.validated = req.body;
      req.validated.user = req.params.id;

      const sector: Sector = await new SectorRepository().createSector(
        req.validated as Sector
      );

      const sectorToReturn = JSON.parse(JSON.stringify(sector));
      delete sectorToReturn.user;

      return res.status(201).send(sectorToReturn);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

  getAllSectors = async (req: Request, res: Response) => {
    try {
      const sectors = await new UserRepository().getUser(req.userId.id);

      return res.status(200).json(sectors.sector);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  };

  getSector = async (req: Request, res: Response) => {
    try {
      const { sector } = req;

      return res.status(200).json(sector);
    } catch (e) {
      return res.status(e.statusCode).json({ error: e.message });
    }
  };

  deleteSector = async (req: Request, res: Response) => {
    try {
      await new SectorRepository().deleteSector(req.sector);

      return res.status(204).json();
    } catch (e) {
      return res.status(400).json({ error: "Erro" });
    }
  };
}
