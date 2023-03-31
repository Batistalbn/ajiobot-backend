import { Repository } from "typeorm";

import { IAttendant, IAttendantRepo, IDeleteAttendant } from "./interfaces";
import { AppDataSource } from "../../config/database";
import { Attendant } from "../../entities/Attendant";

class AttendantRepository implements IAttendantRepo {
  private ormRepo: Repository<Attendant>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Attendant);
  }

  createAttendant = (attendant: IAttendant) => this.ormRepo.save(attendant);

  getAttendants = async () => await this.ormRepo.find();

  getAttendant = async (id) => await this.ormRepo.findOneBy({ id });
  getAttendantsByUser = async (id, skip, per_page) =>
    await this.ormRepo
      .createQueryBuilder("attendant")
      .where("attendant.user = :user", { user: id })
      .skip(skip)
      .take(per_page)
      .getMany();

  getAttendantByMail = async (mail: string) =>
    await this.ormRepo.findOne({ where: { mail } });

  getAttendantByCpfCnpj = async (cpf_cnpj: string) =>
    await this.ormRepo.findOne({ where: { cpf_cnpj } });

  updateAttendant = async (
    attedantId: number,
    attedant: Partial<Attendant>
  ) => {
    return await this.ormRepo.update(attedantId, { ...attedant });
  };

  deleteAttendant = async (dataAttendant: IDeleteAttendant) =>
    await this.ormRepo.delete(dataAttendant);
}

export default AttendantRepository;
