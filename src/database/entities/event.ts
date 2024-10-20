import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import bcrypt from "bcrypt";
import { User } from ".";

@Entity("events")
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  //description, from (datetime), to (datetime), location, organizer (User),createdAt, updatedAt
  @Column()
  description: string;

  @Column()
  from: Date;

  @Column()
  to: Date;

  @Column()
  location: string;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
