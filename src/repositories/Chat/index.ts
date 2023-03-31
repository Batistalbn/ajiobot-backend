import { Repository, SimpleConsoleLogger } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Chat } from "../../entities/Chat";
import { Customer } from "../../entities/Customer";
import { Attendant } from "../../entities/Attendant";
import { IChatRepo, ICreateChatProps } from "./interfaces";
import { number } from "yup";
import { Socket } from "socket.io";
import { io } from "../../";

class ChatRepository implements IChatRepo {
  private ormRepo: Repository<Chat>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Chat);
  }

  getChats = async () => await this.ormRepo.find();

  createChat = async (data: ICreateChatProps) => {
    io.emit("patchChat");
    const chats = (
      await this.ormRepo.findBy({ custumer: data.custumer })
    ).filter((item) => !item.concluded);

    if (chats.length > 0) {
      return chats[0];
    }

    const dataAtual = new Date(Date.now());
    const ano = dataAtual.getFullYear().toString().substring(2);
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, "0");
    const dia = dataAtual.getDate().toString().padStart(2, "0");
    const aammdd = ano + mes + dia;

    let lastChat = await this.ormRepo.find();
    let maior, protocol;

    if (lastChat.length > 0) {
      maior = lastChat[0].protocol;
      for (var i = 0; i < lastChat.length; i++) {
        if (Number(lastChat[i].protocol) > Number(maior)) {
          maior = lastChat[i].protocol;
        }
      }
      if (maior.slice(-6, -4) == dia) {
        protocol = Number(maior) + 1;
      } else {
        protocol = `${aammdd}0001`;
      }
    } else {
      protocol = `${aammdd}0001`;
    }

    return this.ormRepo.save({
      protocol: `${protocol}`,
      created_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
      concluded: false,
      active: false,
      custumer: data.custumer,
      attendant: data.attendant,
    });
  };
  createChatpost = async (data: ICreateChatProps) => {
    io.emit("patchChat");
    return this.ormRepo.save({
      protocol: `${Date.now()}::${data.custumerPhone}`,
      created_date: new Date(Date.now()),
      end_date: new Date(Date.now()),
      concluded: false,
      active: false,
      custumer: data.custumer,
      attendant: data.attendant ? data.attendant : null,
    });
  };

  getOrCreateChat = async (data: ICreateChatProps) => {
    const chat = await (
      await this.ormRepo.findBy({ custumer: data.custumer })
    ).filter((item) => !item.concluded)[0];

    if (chat) {
      return chat;
    } else {
      return false;
    }
  };

  patchChat = async (chatid, chat: Chat) => {
    const response = await this.ormRepo.update(chatid, chat);
    io.emit("patchChat");
    return response;
  };

  getChatsById = async (id) => {
    const responde = await this.ormRepo.findOneBy({ id });
    return responde;
  };

  putChatStage = async (chatid, chat: Chat) => {
    console.log(chatid, chat);
    io.emit("patchChat");
    chat.message = undefined;

    const response = await this.ormRepo.update(chatid, chat);
    console.log(response);
    return response;
  };

  getChatsByCustumer = async (custumer: Customer) => {
    const chats = await this.ormRepo.find({
      where: { custumer: custumer, concluded: false },
    });
    return chats[0];
  };

  isChatcustumer = async (custumer: Customer) => {
    const chats = (await this.ormRepo.findBy({ custumer: custumer })).filter(
      (item) => !item.concluded
    )[0];

    if (chats) {
      return true;
    }
    return false;
  };

  getChatsByAttendant = async (id) => {
    // const chats = await this.ormRepo.find({ select: { id: id } });

    const chats = await this.ormRepo.find({
      relations: {
        attendant: true,
      },
      where: {
        attendant: {
          id: id,
        },
      },
    });

    return chats;
  };

  getChatsByUser = async (id) => {
    const chats = await this.ormRepo.find({
      relations: {
        attendant: true,
      },
      where: {
        attendant: {
          user: {
            id: id,
          },
        },
      },
    });

    return chats;
  };

  getChatsNotActivated = async () =>
    await this.ormRepo.findBy({ active: false });
}

export default ChatRepository;
