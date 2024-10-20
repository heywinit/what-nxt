import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import bcrypt from "bcrypt";
import { Event } from ".";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
}
