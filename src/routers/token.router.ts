import { Router } from "express";
import TokenController from "../controllers/token.controller";

const router = Router();

export default (): Router => {
  const tokenController = new TokenController();

  router.get("/partner/token", tokenController.get);

  return router;
};
