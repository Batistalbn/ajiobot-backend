require("dotenv").config();
import axios from "axios";
import { Request, Response } from "express";
import AttendantRepository from "../repositories/Attendants";
import ChatRepository from "../repositories/Chat";
import CustumerRepository from "../repositories/Custumer";
import MessageRepository from "../repositories/Message";
import qs from "qs";

const useMessageRepository = new MessageRepository();

export default class MessageController {
  static getUserMessage() {
    throw new Error("Method not implemented.");
  }
  getMessage = async (req: Request, res: Response) => {
    const messeges = await useMessageRepository.getMessages();
    if (messeges) {
      return res.status(200).json(messeges);
    }
    return res.status(500).json({ error: "Rota Message em manutenção!!" });
  };

  getMessageByChatId = async (req: Request, res: Response) => {
    const messeges = await useMessageRepository.getMessagesByChat(
      req.params.chatId
    );
    if (messeges) {
      return res.status(200).json(messeges);
    }
    return res.status(500).json({ error: "Rota Message em manutenção!!" });
  };

  postMessage = async (req: Request, res: Response) => {
    const response = await useMessageRepository.createMessage(req.body);

    var axios = require("axios");
    var qs = require("qs");
    var data = qs.stringify({
      channel: "whatsapp",
      source: "554530256854",
      destination: response.phone,
      message: response.text,
      "src.name": "AJIOBOT",
    });
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.gupshup.io/sm/api/v1/msg",
      headers: {
        "Cache-Control": "no-cache",
        "cache-control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: "nkmv5ek0nxeqv1xtd5fx6hilf2trahe1",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    if (response) {
      return res.status(200).json(response);
    }

    return res.status(500).json({ error: "Rota Message em manutenção!!" });
  };

  /* getUserMessage = async (req: Request, res: Response) => {
    console.log(req.body)
  }; */

  collectMessafeCustumer = async (req: Request, res: Response) => {};
}
