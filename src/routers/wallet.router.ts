import { Router } from "express";

import WalletController from "../controllers/wallet.controller";

const router = Router();

export default (): Router => {
  const walletController = new WalletController();

  router.get("/wallet", walletController.getWalletBalance);

  return router;
};
