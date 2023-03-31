import { Router } from "express";

import GupshupController from "../controllers/gupshup.controller";
import SedetiController from "../controllers/sedeti.controller";

const router = Router();

export default (): Router => {
  const gupshupController = new GupshupController();
  const sedetiController = new SedetiController();

  router.post("/gup", gupshupController.response);
  router.post("/gup/sedeti", sedetiController.response);
  router.get("/gup", gupshupController.response);

  return router;
};
