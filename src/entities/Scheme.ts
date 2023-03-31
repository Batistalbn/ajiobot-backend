import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("scheme")
export class Scheme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => User, (user) => user.scheme)
  users: User[];
}
