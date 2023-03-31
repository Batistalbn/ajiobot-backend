import { Repository } from "typeorm";

import { AppDataSource } from "../../config/database";
import { Sector } from "../../entities/Sector";
import { IDeleteSector, ISector, ISectorRepo } from "./interfaces";

class SectorRepository implements ISectorRepo {
  private ormRepo: Repository<Sector>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Sector);
  }

  createSector = (sector: ISector) => this.ormRepo.save(sector);
  getSector = async (id) => await this.ormRepo.findOneBy({ id });
  getSectors = async () => await this.ormRepo.find();
  deleteSector = async (dataSector: IDeleteSector) =>
    await this.ormRepo.delete(dataSector);
}

export default SectorRepository;
