import { UpdateResult } from "typeorm";
import { Customer } from "../../entities/Customer";

interface ICustumer {
  id?: number;
  phone: string;
  name: string;
  created_date: Date;
  blocked: boolean;
}

interface ICreateCustumerProps {
  phone: string;
  name: string;
}

interface IDataUpdate {
  [key: string]: string | number;
}

interface ICustumerRepo {
  getCustumers: () => Promise<Customer[]>;
  getCustumersByPhone: (phone: string) => Promise<Customer>;
  createCustumer: (data: ICreateCustumerProps) => Promise<
    {
      phone: string;
      name: string;
      create_date: Date;
      blocked: boolean;
    } & Customer
  >;
}

export { ICustumer, IDataUpdate, ICustumerRepo, ICreateCustumerProps };
