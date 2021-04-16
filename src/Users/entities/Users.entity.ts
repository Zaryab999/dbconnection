import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
  } from 'typeorm';
   
  import { IsString, IsInt, IsNotEmpty } from 'class-validator';
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Column()
    @IsNotEmpty()
    Name: string;
  
    @Column()
    @IsNotEmpty()
    Password: string;


    @Column({unique:true})
    @IsNotEmpty()
    Email: string;

   async compare(pass:string){
      if (pass==this.Password)
        return await true;
      else
        return await false;
    }
   
  }
//export class User {}
