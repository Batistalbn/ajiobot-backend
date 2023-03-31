import { Router } from "express";
import ChatController from "../controllers/chat.controller";
import validateShape from "../middlewares/validateShape.middleware";
import { ChatCreateShape, ChatUpdateShape } from "../shapes/chats.shape";
import userPermissions from "../middlewares/userPermissions.middleware";
import adminPermissions from "../middlewares/adminPermissions.middleware";
import validateAuth from "../middlewares/validateAuth.middleware";
import chatActiveExists from "../middlewares/chat.middlewares/ChatExists.middleware";

const chat = Router();

export default (): Router => {
  const chatController = new ChatController();

  chat.post(
    "/chat",
    validateShape(ChatCreateShape),
    validateAuth,
    chatActiveExists,
    chatController.createChat
  );
  chat.get(
    "/chats/count",
    validateAuth,
    adminPermissions,
    chatController.getAllChatsCount
  );
  chat.get("/chats/:id", chatController.getChatsByUser);
  // chat.get("/chats/:id", validateAuth, userPermissions, chatController.getChatsByUser);
  chat.get(
    "/chats/count/:id",
    validateAuth,
    userPermissions,
    chatController.getAllChatsCount
  );
  chat.patch(
    "/chat/:id",
    validateShape(ChatUpdateShape),
    validateAuth,
    chatActiveExists,
    chatController.patchChat
  );
  chat.get(
    "/chat/attendant/:id",
     validateAuth,
    // validateRations,
    chatController.getChatsByAttendant
  );
  chat.get("/chat", validateAuth, chatController.getChatsNotActivated);
  chat.get("/chat/:id", validateAuth, chatController.getChatById);

  return chat;
};
