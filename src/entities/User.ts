import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendant } from "./Attendant";
import { Scheme } from "./Scheme";
import { Sector } from "./Sector";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mail: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf_cnpj: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ default: 0.0 })
  money: number;

  @Column({ default: 1 })
  permission: number;

  @ManyToOne(() => Scheme, (scheme) => scheme.users)
  scheme: Scheme;

  @OneToMany(() => Attendant, (attendant) => attendant.user, { eager: true })
  attendants: Attendant[];

  @OneToMany(() => Sector, (sector) => sector.user, { eager: true })
  sector: Sector[];
}
