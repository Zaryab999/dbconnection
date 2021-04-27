import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
  } from 'typeorm';
  import * as jwt from 'jsonwebtoken';


@Entity()
export class userroles{
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Column()
    User_ID: number;
  
    @Column()
    Role_ID: number;


}