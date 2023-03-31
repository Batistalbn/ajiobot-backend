import { Request, Response } from "express";
import { startSedeti } from "../services/sedeti.service";
import { IResBoryMessage } from "../repositories/Message/interfaces";
export default class SedetiController {
  response = async (req: Request, res: Response) => {
    try {
      const bodyResponde: IResBoryMessage = req.body;
      if (bodyResponde.payload.payload.text)
        if (bodyResponde.type === "message")
          startSedeti(bodyResponde);
      return res.status(200).send();
    } catch (e) {
      return res.status(200).send();
    }
  };
}