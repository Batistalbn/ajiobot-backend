import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Chat } from "./Chat";
import { Customer } from "./Customer";
import { User } from "./User";

@Entity("message")
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  text: string;

  @Column(/* { default: Date.now() } */)
  date_time: Date;

  @Column()
  destination: string;

  @Column()
  sender: string;

  @Column()
  from: string;

  @Column()
  is_customer_message: boolean;

  @ManyToOne(() => User, (user) => user.scheme, {
    eager: true,
  })
  users: User[];

  @ManyToOne(() => Customer, (user) => user.name)
  customer: Customer[];


  @ManyToOne(() => Chat, (scheme) => scheme.message)
  chat: Chat;
}
