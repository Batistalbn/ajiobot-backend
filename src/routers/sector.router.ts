import { Router } from "express";
import SectorController from "../controllers/sector.controller";
import sectorExists from "../middlewares/sectorExists.middleware";
import userPermissions from "../middlewares/userPermissions.middleware";
import validateAuth from "../middlewares/validateAuth.middleware";

const chat = Router();

export default (): Router => {
  const sectorController = new SectorController();

  chat.post(
    "/sector/:id",
    validateAuth,
    userPermissions,
    sectorController.createSector
  );
  chat.get(
    "/sector",
    validateAuth,
    userPermissions,
    sectorController.getAllSectors
  );
  chat.get(
    "/sector/:id",
    validateAuth,
    sectorExists,
    userPermissions,
    sectorController.getSector
  );
  chat.delete(
    "/sector/:id",
    validateAuth,
    userPermissions,
    sectorExists,
    sectorController.deleteSector
  );

  return chat;
};
