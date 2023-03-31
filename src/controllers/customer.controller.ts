import { Request, Response } from "express";

import CustumerRepository from "../repositories/Custumer";

const useCustumer = new CustumerRepository();

export default class CustomerController {
  getAllCustomer = async (req: Request, res: Response) => {
    return res.status(500).json({ error: "Rota attendant em manutenção!!" });
    /* try {
      const attendant = await new AttendantRepository().getAttendant(
        req.userId.id,
      );

      return res.status(200).json(attendant.customers);
    } catch (e) {
      return res.status(404).json({ error: "atendente não encontrado" });
    } */
  };
  postCustumer = async (req: Request, res: Response) => {
    try {
      const custumer = await useCustumer.createCustumer(req.body);
      return res.status(201).json(custumer);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
    // if (await new CustumerRepository().getCustumersByPhone(req.body.phone)) {
    //   return res.status(400).json({ error: "telefone ja cadastrado" });
    // } else {
    //   custumer
    //     ? res.status(200).json(custumer)
    //     : res.status(500).json({ error: "Rota attendant em manutenção!!" });
    // }
  };
}
