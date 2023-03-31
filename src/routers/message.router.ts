import { Router } from "express";
import MessageController from "../controllers/message.controller";
import chatValidadeAttendent from "../middlewares/chat.middlewares/chatValidadeAttendent.middleware";
import validateAuth from "../middlewares/validateAuth.middleware";
import validateShape from "../middlewares/validateShape.middleware";
import { MessageShape } from "../shapes/message.shape";

const router = Router();

export default (): Router => {
  const useMessageControler = new MessageController();

  router.post(
    "/message",
    validateShape(MessageShape),
    chatValidadeAttendent,
    validateAuth,
    useMessageControler.postMessage
  );
  router.get("/message", validateAuth, useMessageControler.getMessage);
  router.get(
    "/message/:chatId",
    validateAuth,
    useMessageControler.getMessageByChatId
  );

  return router;
};
