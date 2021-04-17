import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
  } from 'typeorm';
  import * as jwt from 'jsonwebtoken';

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
    toResponseObject(showToken: boolean = true)
    {
        const {ID, Name, Email ,token} = this;
        const responseObject : any =  {ID, Name, Email , token};
        if(!showToken)
        {
            responseObject.token = token;
        }

        return responseObject;
    }


    private get token(): string {
      const { ID, Email } = this;
  
      return jwt.sign(
        {
          ID,
          Email,
        },
        "ThisIsASecret",
        { expiresIn: '7d' },
      );
    }
   
  }
//export class User {}
