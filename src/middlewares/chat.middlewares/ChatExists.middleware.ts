import { Request, Response, NextFunction } from "express";
import ChatRepository from "../../repositories/Chat";
import CustumerRepository from "../../repositories/Custumer";
import { ErrorHandler } from "../../services/errors.service";

const chatActiveExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.method === "PATCH") {
      const chat = await new ChatRepository().getChatsById(req.params.id);
      if (!chat) {
        throw new ErrorHandler(400, "chat não encontrado.");
      }
      return next();
    }
    const custumer = await new CustumerRepository().getCustumersByPhone(
      req.body.custumerPhone
    );

    if (!custumer) {
      throw new ErrorHandler(400, "custumer não existe.");
    }

    const chat = await new ChatRepository().isChatcustumer(custumer);

    if (!chat) {
      throw new ErrorHandler(400, "custumer já tem um chat ativo.");
    }

    req.chat = chat;

    return next();
  } catch (err) {
    return res.status(err.statusCode || 400).json({ err: err.message });
  }
};

export default chatActiveExists;
