import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";
import { User } from "./User";

@Entity("Sectors")
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.sector)
  user: User;

  @OneToMany(() => Chat, (chat) => chat.sector)
  chat: Chat;

}
