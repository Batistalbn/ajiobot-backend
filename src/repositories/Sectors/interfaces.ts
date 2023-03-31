import { DeleteResult } from "typeorm";
import { Sector } from "../../entities/Sector";

interface ISector {
  id?: number;
  name: string;
}

interface IDeleteSector {
  [key: string]: string | number;
}

interface ISectorRepo {
  getSector: (id: number) => Promise<ISector>;
  createSector: (attendant: Sector) => Promise<Sector>;
  deleteSector: (dataAttendant: IDeleteSector) => Promise<DeleteResult>;
}

export { IDeleteSector, ISector, ISectorRepo };
