import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendant } from "./Attendant";
import { Chat } from "./Chat";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @Column(/* { default: Date.now() } */)
  create_date: Date;

  @Column({ default: false })
  blocked: boolean;

  @OneToMany(() => Chat, (chat) => chat.custumer)
  chat: Chat;

  /* @ManyToMany(() => Attendant, (attendants) => attendants.customers)
  attendants: Attendant[]; */
}
