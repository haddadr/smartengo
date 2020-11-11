import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import {hash, hashSync} from 'bcrypt';
import { IsEmail, Min } from 'class-validator';
import { UserInterface } from './user.interface';

@Entity('user')
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Min(8)
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /* TODO hash doesn't work on ALPINE 10 version
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }*/
}
