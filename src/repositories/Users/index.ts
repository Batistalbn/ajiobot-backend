import { Repository } from "typeorm";
import { AppDataSource } from "../../config/database";
import { User } from "../../entities/User";
import { IDataUpdate, IUser, IUserRepo } from "./interfaces";

class UserRepository implements IUserRepo {
  private ormRepo: Repository<User>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(User);
  }

  getUsers = async () => await this.ormRepo.find();
  create = (user: IUser) => this.ormRepo.save(user);
  getUser = async (id) => await this.ormRepo.findOneBy({ id });

  getUserByMail = async (mail: string) =>
    await this.ormRepo.findOne({ where: { mail } });

  getUserByCpfCnpj = async (cpf_cnpj: string) =>
    await this.ormRepo.findOne({ where: { cpf_cnpj } });

  updateUser = async (dataUser: IDataUpdate, update: IDataUpdate) =>
    await this.ormRepo.update(dataUser, update);
}

export default UserRepository;
