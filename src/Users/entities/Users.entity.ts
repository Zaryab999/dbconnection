import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
  } from 'typeorm';
  import * as jwt from 'jsonwebtoken';
  import { MailerService } from '@nestjs-modules/mailer';
  //import {transporte}
  import randomInteger from 'random-int';
  import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { randomInt } from 'node:crypto';
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
    @Column()
    vtoken:string

    @Column({default:false})
    Isactive:boolean;
    

   async compare(pass:string){
      if (pass==this.Password)
        return await true;
      else
        return await false;
    }
    ResponseObject(showToken: boolean = true)
    {
        const {ID, Name, Email ,access_token} = this;
        const responseObject : any =  {ID, Name, Email , access_token};
        if(!showToken)
        {
            responseObject.token = access_token;
        }
        //return "welcome";
        return responseObject;
    }


    private get access_token(): string {
      const { ID, Email } = this;
      // const a=  Date.now.toString;
      // console.log(a)
      return jwt.sign(
        {
          ID,
          Email,
        },
        "secret",  
        { expiresIn: '1d' },
      );
    }
    // public verify(){
    //   jwt.sign(
    //     {
    //       user:_.pick(Users, this.ID),
    //     },
    //     "secret",
    //     {expiresIn:'1d'},
    //     (this.access_token)=>{
    //       const url =`http://localhost:3000/abc/${}`;
          

    //     },
    //   )
    // }
   
  }
//export class User {}
