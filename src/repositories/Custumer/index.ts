import { errorMonitor } from "events";
import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { Customer } from "../../entities/Customer";
import AttendantRepository from "../Attendants";
import ChatRepository from "../Chat";
import { IResBoryMessage } from "../Message/interfaces";
import { ICreateCustumerProps, ICustumerRepo } from "./interfaces";

const useChatRepository = new ChatRepository();
const useAtendetteRepository = new AttendantRepository();

class CustumerRepository implements ICustumerRepo {
  private ormRepo: Repository<Customer>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Customer);
  }

  createCustumer = async (data: ICreateCustumerProps) => {
    const custumer = {
      phone: data.phone,
      name: data.name,
      create_date: new Date(Date.now()),
      blocked: false,
    };
    return await this.ormRepo.save(custumer);
  };

  getCustumersByPhone = async (phone: string) => {
    return await this.ormRepo.findOneBy({ phone: phone });
  };

  getCustumers = async () => await this.ormRepo.find();

  getCustumersById = async (id: number) =>
    await this.ormRepo.findOneBy({ id: id });

  createNewCusumer = async (payload: IResBoryMessage) => {
    const custumerData = payload.payload.sender;
    const attendant = await useAtendetteRepository.getAttendant(1);

    const newCustumer = await this.createCustumer({
      name: custumerData.name,
      phone: custumerData.phone,
    });

    const newChat = useChatRepository.createChat({
      attendant: attendant,
      custumer: newCustumer,
      custumerPhone: newCustumer.phone,
    });

    return { newChat, newCustumer };
  };
}

export default CustumerRepository;
