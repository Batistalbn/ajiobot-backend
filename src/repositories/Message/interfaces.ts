//import { UpdateResult } from "typeorm";
import { FindOperator } from "typeorm";
import { Chat } from "../../entities/Chat";
import { Customer } from "../../entities/Customer";
import { Message } from "../../entities/Message";
import { User } from "../../entities/User";
import { ICustumer } from "../Custumer/interfaces";

interface IMessage {
  id?: number;
  type: string;
  text: string;
  date_time: Date;
  destination: string;
  sender: string;
  is_customer_message: boolean;
  from: string;
  chatId: Chat | any;
  usersId: User | any;
  custumerId: Customer | any;
}

interface IResBoryMessage {
  app: string;
  timestamp: Date;
  version: number;
  type: string;
  payload: IPayloadMessage;
}

interface IPayloadMessage {
  id: string;
  source: string;
  type: string;
  payload: { text: string } | any;
  sender: ISenderMessage;
}

interface ISenderMessage {
  phone: string;
  name: string;
  country_code: string;
  dial_code: string;
}

interface IDataUpdate {
  [key: string]: string | number;
}

interface IMessageRepo {
  createMessage: (message: IMessage) => Promise<IMessage & Message>;
  getMessages: () => Promise<Message[]>;
  getMessagesByDataTime: (data_time: Date | FindOperator<Date>) => Promise<Message>
}

export { IMessage, IDataUpdate, IMessageRepo, IResBoryMessage };
