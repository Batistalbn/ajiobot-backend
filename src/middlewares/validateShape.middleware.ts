import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const fs = require("fs");

const validateShape =
  (shape: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      delete req.body.permission;
      const validated = await shape.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validated = validated;

      return next();
    } catch (e) {
      req.file && fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: e.errors });
    }
  };

export default validateShape;
