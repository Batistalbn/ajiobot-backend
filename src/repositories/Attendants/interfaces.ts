import { DeleteResult, UpdateResult } from "typeorm";
import { Attendant } from "../../entities/Attendant";

interface IAttendant {
  id?: number;
  mail: string;
  name: string;
  cpf_cnpj: string;
  phone: string;
  password: string;
  money?: number;
  permission?: number;
}

interface IDeleteAttendant {
  [key: string]: string | number;
}

interface IAttendantRepo {
  getAttendant: (id: number) => Promise<IAttendant>;
  getAttendants: () => Promise<Attendant[]>;
  getAttendantsByUser: (
    id: number,
    skip: number,
    per_page: number
  ) => Promise<Attendant[]>;

  getAttendantByMail: (mail: string) => Promise<IAttendant>;
  createAttendant: (attendant: Attendant) => Promise<Attendant>;
  getAttendantByCpfCnpj: (cpf_cnpj: string) => Promise<IAttendant>;
  deleteAttendant: (dataAttendant: IDeleteAttendant) => Promise<DeleteResult>;
  updateAttendant: (
    attedantID: number,
    attedant: Partial<Attendant>
  ) => Promise<UpdateResult>;
}

export { IAttendant, IAttendantRepo, IDeleteAttendant };
