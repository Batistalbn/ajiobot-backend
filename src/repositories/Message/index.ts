import axios from "axios";
import { FindOperator, Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Chat } from "../../entities/Chat";
import { Message } from "../../entities/Message";
import ChatRepository from "../Chat";
import CustumerRepository from "../Custumer";
import UserRepository from "../Users";
import { IMessage, IMessageRepo, IResBoryMessage } from "./interfaces";
import qs from "qs";
import { io } from "../..";

const useCustumerRepository = new CustumerRepository();
const useChatRepository = new ChatRepository();
const useUserRepository = new UserRepository();

class MessageRepository implements IMessageRepo {
  private ormRepo: Repository<Message>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Message);
  }

  getMessages = async () => {
    const mesage = await this.ormRepo.find();
    return mesage;
  };

  getMessagesByUser = async (user: number) => {

    const mesage = await this.ormRepo.find({
      relations: {
        users: true,
      },
      where: {
        users: {
          id: user,
        },
      },
    });
    return mesage;
  };

  getMessagesByChat = async (chatid) => {
    return await this.ormRepo.find({});
  };

  getMessagesByCustumer = async (chustumerId) => {
    return await this.ormRepo.findBy({ sender: chustumerId });
  };

  getMessagesByDataTime = async (data_time: Date | FindOperator<Date>) => {
    return await this.ormRepo.findOneBy({ date_time: data_time });
  };

  createMessage = async (message: any) => {
    io.emit("patchMessage");
    return await this.ormRepo.save(message);
  };

  createMessageCustumer = async (paylod: IResBoryMessage) => {};
}

export default MessageRepository;
