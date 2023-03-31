import axios from "axios";
import { Request, Response } from "express";
import ChatRepository from "../repositories/Chat";
import CustumerRepository from "../repositories/Custumer";
import MessageRepository from "../repositories/Message";
import qs from "qs";

const useMessageRepository = new MessageRepository();

import { IResBoryMessage } from "../repositories/Message/interfaces";

export default class GupshupController {
  response = async (req: Request, res: Response) => {
    const bodyResponde: IResBoryMessage = req.body;

    try {
      if (bodyResponde.payload.payload.text)
        if (bodyResponde.type === "message") {
          const text = bodyResponde.payload.payload.text;
          const sender = bodyResponde.payload.sender;

          const isMessage = await new MessageRepository().getMessagesByDataTime(
            new Date(bodyResponde.timestamp)
          );
          const isCustumer = await new CustumerRepository().getCustumersByPhone(
            bodyResponde.payload.sender.phone
          );

          const newCustumer =
            !isCustumer &&
            (await new CustumerRepository().createCustumer({
              phone: sender.phone,
              name: sender.name,
            }));

          const isChat =
            isCustumer &&
            (await new ChatRepository().isChatcustumer(isCustumer));

          if (!isMessage && !isCustumer && text !== "Sim") {
            const message = {
              type: bodyResponde.payload.type
                ? bodyResponde.payload.type
                : "message",
              text: text,
              date_time: new Date(bodyResponde.timestamp),
              destination: "atendent",
              sender: "custumer",
              from: "computer",
              customer: isCustumer ? isCustumer : newCustumer,
              chat:
                isCustumer && isChat
                  ? await new ChatRepository().getChatsByCustumer(isCustumer)
                  : null,
              is_customer_message: true,
              //users: user.id,
            };

            await new MessageRepository().createMessage(message);

            const body = {
              source: "554530256854",
              destination: sender.phone,
              template: `{"id": "a99e5249-88c9-45d9-ab85-08b6a3a97577","params": ["${sender.name}" ]}`,
              "src.name": "AJIOBOT",
            };

            const data = qs.stringify(body);
            let result;

            await axios
              .post(
                `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
                data,
                {
                  headers: {
                    Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
                    apikey: process.env.API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {
                result = res.data;
              })
              .catch((e) => {
                console.log(e);
              });
            return;
          } else if (!isMessage && !isChat && text !== "Sim") {
            await new ChatRepository().createChat({
              custumer: isCustumer,
              custumerPhone: isCustumer.phone,
            });

            const body = {
              source: "554530256854",
              destination: sender.phone,
              template: `{"id": "a99e5249-88c9-45d9-ab85-08b6a3a97577","params": ["${sender.name}" ]}`,
              "src.name": "AJIOBOT",
            };

            const data = qs.stringify(body);
            let result;

            await axios
              .post(
                `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
                data,
                {
                  headers: {
                    Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
                    apikey: process.env.API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {
                result = res.data;
              })
              .catch((e) => {
                console.log(e);
              });
          } else if (!isMessage && text !== "Sim") {
            const message = {
              type: bodyResponde.payload.type
                ? bodyResponde.payload.type
                : "message",
              text: text,
              date_time: new Date(bodyResponde.timestamp),
              destination: "atendent",
              sender: "custumer",
              from: "computer",
              customer: isCustumer.id,
              chat: await new ChatRepository().createChat({
                custumer: isCustumer,
                custumerPhone: isCustumer.phone,
              }),
              is_customer_message: true,
              //users: user.id,
            };

            await new MessageRepository().createMessage(message);
            return;
          } else if (!isMessage && text === "Sim") {
            const message = {
              type: bodyResponde.payload.type
                ? bodyResponde.payload.type
                : "message",
              text: text,
              date_time: new Date(bodyResponde.timestamp),
              destination: "atendent",
              sender: "custumer",
              from: "computer",
              customer: isCustumer.id,
              chat: await new ChatRepository().createChat({
                custumer: isCustumer,
                custumerPhone: isCustumer.phone,
              }),
              is_customer_message: true,
              //users: user.id,
            };

            await new MessageRepository().createMessage(message);
            const body = {
              source: "554530256854",
              destination: sender.phone,
              template:
                '{"id": "ca5609b2-64ad-4231-ac8e-8e7f08696c8f","params": ["Christian" ]}',
              "src.name": "AJIOBOT",
            };
            const data = qs.stringify(body);
            let result;

            await axios
              .post(
                `https://partner.gupshup.io/partner/app/bd677cf7-18eb-4eda-9c58-e10264720051/template/msg`,
                data,
                {
                  headers: {
                    Authorization: "sk_d99d89bde72c4d3080daffe3059d1b10",
                    apikey: process.env.API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              )
              .then((res) => {
                result = res.data;
              })
              .catch((e) => {
                const status = e.response.request.res.statusCode;
                const message = e.response.data;
                result = { status: status, message: message };
              });
            return;
          }
        }
      return res.status(200).json("retorno");
    } catch (e) {
      console.log(e);
    }
  };
}
