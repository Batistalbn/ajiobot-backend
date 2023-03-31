import { UpdateResult } from "typeorm";

interface IUser {
  id?: number;
  mail: string;
  name: string;
  cpf_cnpj: string;
  phone: string;
  password: string;
  money?: number;
  permission?: number;
}

interface IDataUpdate {
  [key: string ]: string | number;
}

interface IUserRepo {
	create: (user: IUser) => void;
  getUsers: () => Promise<IUser[]>;
  getUser: (id: number) => Promise<IUser>;
  getUserByMail: (mail: string) => Promise<IUser>;
	getUserByCpfCnpj: (cpf_cnpj: string) => Promise<IUser>;
  updateUser: (dataUser: IDataUpdate, update: IDataUpdate) => Promise<UpdateResult>;
}

export { IUser, IDataUpdate, IUserRepo };
