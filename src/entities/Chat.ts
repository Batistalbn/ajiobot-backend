import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Attendant } from "./Attendant";
import { Customer } from "./Customer";
import { Message } from "./Message";
import { Scheme } from "./Scheme";
import { Sector } from "./Sector";

@Entity("chat")
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  protocol: string;

  @Column(/* { default: Date.now() } */)
  created_date: Date;

  @Column()
  end_date: Date;

  @Column()
  concluded: boolean;

  @Column()
  active: boolean;

  @Column({ default: 0 })
  stage: number;

  @OneToMany(() => Message, (message) => message.chat, {
    eager: true,
  })
  message: Message[];

  @ManyToOne(() => Customer, (custumer) => custumer.chat, {
    eager: true,
  })
  custumer: Customer;

  @ManyToOne(() => Sector, (sector) => sector.chat, {
    eager: true,
  })
  sector: Sector;

  // @OneToMany(() => Attendant, (attendant) => attendant.chat, { eager: true })
  // attendants: Attendant[];

  @ManyToOne(() => Attendant, (attendant) => attendant.chat, { eager: true })
  attendant: Attendant;

  /*
  @ManyToOne(() => Scheme, (scheme) => scheme.users)
  scheme: Scheme;

  */
}
