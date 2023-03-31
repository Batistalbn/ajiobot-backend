import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { Sector } from "./Sector";
import { User } from "./User";

@Entity("attendants")
export class Attendant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mail: string;

  @Column({ unique: true, nullable: true })
  src: string;

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

  @Column({ default: 0 })
  permission: number;

  @ManyToOne(() => User, (user) => user.attendants)
  user: User;

  @OneToMany(() => Chat, (chat) => chat.attendant)
  chat: Chat[];

  @ManyToMany(() => Sector, { eager: true })
  @JoinTable()
  sector: Sector[];
}
