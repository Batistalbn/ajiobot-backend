import { Router } from "express";
import CustumerController from "../controllers/customer.controller";
import custumerExists from "../middlewares/custumerExists.middleware";

const router = Router();

export default (): Router => {
  const custumerController = new CustumerController();

  router.get("/custumer", custumerController.getAllCustomer);
  router.post("/custumer", custumerExists, custumerController.postCustumer);

  return router;
};
