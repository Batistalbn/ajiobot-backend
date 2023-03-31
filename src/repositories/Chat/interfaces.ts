import { Attendant } from "../../entities/Attendant";
import { Chat } from "../../entities/Chat";
import { Customer } from "../../entities/Customer";

interface IChat {
  id: number;
  protocol: string;
  created_date: Date;
  end_date: Date | any;
  concluded: boolean;
  active: boolean;
  custumerId: number;
}

interface IDataUpdate {
  [key: string]: string | number;
}
interface ICreateChatProps {
  custumerPhone: string;
  custumer: Customer;
  attendant?: Attendant;
}

interface IChatRepo {
  getChatsNotActivated: () => Promise<Chat[]>;
  getChatsById: (id: any) => Promise<Chat>;
  //getChatsByAttendant: (atendentId: any) => Promise<void>;
  getChatsByCustumer: (
    custumer: Customer
  ) => Promise<Chat>;

  getOrCreateChat: (data: ICreateChatProps) => Promise<false | Chat>;
}

export { IDataUpdate, IChatRepo, IChat, ICreateChatProps };
