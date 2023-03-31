require("dotenv").config();
import { Request, Response } from "express";
import ChatRepository from "../repositories/Chat";
import { IChat } from "../repositories/Chat/interfaces";

const useChatRepository = new ChatRepository();



export default class ChatController {
  getChatsNotActivated = async (req: Request, res: Response) => {
    const result = await useChatRepository.getChatsNotActivated();
    result
      ? res.status(200).json(result)
      : res.status(400).json({ error: "Error" });
  };
  patchChat = async (req: Request, res: Response) => {
    const chat = useChatRepository.patchChat(req.params, req.validated);

    chat
      ? res.status(201).json(chat)
      : res.status(400).json({ error: "Error" });
  };
  createChat = async (req: Request, res: Response) => {
    const chat = await useChatRepository.createChatpost(req.body);
    chat
      ? res.status(200).json(chat)
      : res.status(400).json({ error: "Error" });
  };
  getChatById = async (req: Request, res: Response) => {
    const chat = await useChatRepository.getChatsById(req.params.id);

    if (chat) {
      return res.status(200).json(chat);
    }

    return res.status(400).json({ error: "Error" });
  };

  getChatsByAttendant = async (req: Request, res: Response) => {
    const chats = await useChatRepository.getChatsByAttendant(req.params.id);
    chats
      ? res.status(200).send(chats)
      : res.status(400).json({ error: "Error" });
  };



  getChatsByUser = async (req: Request, res: Response) => {
    const chats = await useChatRepository.getChatsByUser(req.params.id);
    chats
      ? res.status(200).send(chats)
      : res.status(400).json({ error: "Error" });
  };

  getAllChats = async (req: Request, res: Response) => {
    const chats = await useChatRepository.getChats();
    chats
      ? res.status(200).send(chats)
      : res.status(400).json({ error: "Error" });
  };

  getAllChatsCount = async (req: Request, res: Response) => {
    const chats = await useChatRepository.getChats();
    chats
      ? res.status(200).send(chats.length)
      : res.status(400).json({ error: "Error" });
  };
}
