import { Router } from "express";

import TemplateController from "../controllers/template.controller";

const router = Router();

export default (): Router => {
  const templateController = new TemplateController();

  router.post("/template", templateController.createTemplate);
  router.get("/template", templateController.getAllTemplates);
  router.get("/template/:templateName", templateController.getTemplateByName);
  router.delete("/template/:elementName", templateController.deleteTemplate);
  router.post("/send/template", templateController.sendTemplateToCustomer);

  return router;
};
