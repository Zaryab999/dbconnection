import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Users} from 'src/Users/entities/Users.entity';
import {Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { exception } from 'node:console';
import { loginUserDto } from './dto/loginUserDto';
import {userroles} from 'src/Users/entities/User_Roles.entity'
import { CreateUser_RoleDto } from './dto/createuser_role.dto';
import * as Mailgun from 'mailgun-js';
import {VerifyUserdto} from 'src/Users/dto/verifyuser.dto';
import { response } from 'express';
@Injectable()

export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersrepository: Repository<Users>,
    @InjectRepository(userroles)
    private readonly userrolesrepository:Repository<userroles>
  ) { }

  /*Signup */ 

  async create(createUserDto: CreateUserDto) 
   {
      const {Email}= createUserDto;
      const {Name} = createUserDto;
      
      const user = await this.usersrepository.findOne({where : {Email} });
      if(user)
      {
        throw new HttpException('User with this Email Already Exists ',HttpStatus.BAD_REQUEST);
      }

      else
      {
        const user = await this.usersrepository.create(createUserDto);
        await this.usersrepository.save(user);
        const vtoken:any=user.ResponseObject();
        this.updatevtoken(vtoken.access_token,vtoken.Email);
        this.sendmail(vtoken.access_token,vtoken.ID,vtoken.Email);
        //return `user ${Name} created `;
        return user
      }
      
      

   }

   async updatevtoken(vtoken:string,email:string){
      console.log(vtoken)
      console.log(email)

    return await this.usersrepository.query("UPDATE users SET vtoken='"+vtoken+"' WHERE Email = '"+email+"'");
   }


   async assignrole(CreateUser_RoleDto:CreateUser_RoleDto){
    const{User_ID} = CreateUser_RoleDto
    
    const user = await this.userrolesrepository.findOne({where: {User_ID}})
    if(user)
      {
        throw new HttpException('Role Already assigned to this user',HttpStatus.BAD_REQUEST);
      }
    else{
    const user = await this.userrolesrepository.create(CreateUser_RoleDto);
    await this.userrolesrepository.save(user);
    return "Role assigned"
    }
   }
   async updaterole(User_ID:number,r_id:number){

    const user = await this.userrolesrepository.findOne({where: {User_ID}})
    if(!user)
      {
        throw new HttpException('User have not assigned any role first assign the role',HttpStatus.BAD_REQUEST);
      }
    else{
      await this.userrolesrepository.query("update userroles set Role_ID='"+r_id+"' where User_ID ='"+User_ID+"'");
    }    


   }

    /* Login Through Builtin Orm Functions
   sync login (loginuserdto:loginUserDto)
    {
      const {Email} = loginuserdto;
      const {Password} =loginuserdto;
     // const {Name} =loginuserdto;
      const user =  await this.usersrepository.findOne({where : {Email} });
      //await user.compare(Password );
      if(!user || !(await user.compare(Password)))
      {
        throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST,);
      }
      else return`successfully logged in`;
     
    }*/
      
    async login(data: loginUserDto)
    {
      const {Email, Password} = data;
      //console.log(Email,Password)
      const user = await this.usersrepository.findOne({where : {Email} });
      
      const{Isverified}=user
      //console.log(Isverified)
      //const{ID}=user
      //const isverify=await this.userrolesrepository.query("SELECT Isverified from users where ID='"+ID+"'");
      //console.log(user)
      
      
      if(!user || !(await user.compare(Password)) ||!Isverified)
      {
        throw new HttpException('Invalid Email or Password', HttpStatus.BAD_REQUEST,);
      }
      
      //console.log(user)
      // console.log(user.ResponseObject());
      
      return user.ResponseObject();
    }

  
    /* Login Through SPs

    async login (loginuserdto:loginUserDto)
    {
      const {Email} = loginuserdto;
      const {Password} =loginuserdto;

      return await this.usersrepository.query("signin @u_name='"+Email +"',@pass='"+Password +"' ");
    }

    */
  
  /* Fetch all Users*/ 

  async findAll():Promise<Users[]>
  {
    return await this.usersrepository.find();
  }

  async findOnebyemail(data: loginUserDto): Promise<Users>
  {
    const {Email} = data;
    return await this.usersrepository.findOne(Email);
  }

  /* Fetch single Users*/ 

  async findOne(id: number): Promise<Users>
  {
    return await this.usersrepository.findOne(id);
  }

  /* Update User*/ 

  async update(ID: number, updateUserDto: UpdateUserDto) 
  {
    const user= await this.usersrepository.findOne({where :{ID}});
    //console.log(user);
  
    if(!user)   
    {
      throw new HttpException("User not found",HttpStatus.BAD_REQUEST);
    }
    else
    {
      await this.usersrepository.update({ID},updateUserDto);
      const up_user= await this.usersrepository.findOne({where :{ID}});
      return up_user;
    }
      
    
  }
  /*
  sendemail()
  
  {
   
    console.log ("in send email")
    var API_KEY = '4e021690f506bb90d064f7c9310d7879-4b1aa784-7f8a9964';
    var DOMAIN = 'sandboxe4281acd0c154c78a338a1d0df63587f.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});

    const data = {
      from: 'sd@gmail.com',
      to: 'Daniyalbhatti.in@gmail.com',
      subject: 'Hello',
      text: 'Testing some Mailgun awesomeness!'
    };

    mailgun.messages().send(data, (error, body) => {
      if(error)
        {console.log("error",error)}
      console.log(body);
    });
  
  
  
  }
*/

sendmail(vtoken:string,id:number,email:string){
  
  //this.usersrepository.query("up_vcode @vtoken='"+ vtoken +"',@email='"+ email +"' ")
  
  var nodemailer = require('nodemailer');
  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaryabsultan01@gmail.com',
      pass: 'sxsymrutzuircztu'
    }
  });

  var mailOptions = {
    from: 'ecommerce@gmail.com',
    to: `${email}`,
    subject: 'Verify your Email',
    html: `<h2>Plz Click the link below to verify your email</h2></br><a href="http://localhost:4200/verify/${vtoken}/${id}" >CLICK ME TO VERIFY </a>`
    
  };
  
  mail.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



}

chpasssmail(vtoken:string,id:number,email:string){
  
  //this.usersrepository.query("up_vcode @vtoken='"+ vtoken +"',@email='"+ email +"' ")
  
  var nodemailer = require('nodemailer');
  var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaryabsultan01@gmail.com',
      pass: 'sxsymrutzuircztu'
    }
  });

  var mailOptions = {
    from: 'ecommerce@gmail.com',
    to: `${email}`,
    subject: 'Change Your Password',
    html: `<h2>Plz Click the link below to change your Password</h2></br><a href="http://localhost:4200/changepass/${vtoken}/${id}" >CLICK ME TO CHANGE PASSWORD</a>`
    
  };
  
  mail.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



}
async verifyemail(verifyuserdto:VerifyUserdto)
{
  const {ID}= verifyuserdto;
  const {vtoken} = verifyuserdto;
  const{Email}  = verifyuserdto
  const useri = await this.usersrepository.findOne({where : {ID} });
  const uservt = await this.usersrepository.findOne({where : {vtoken} });
  console.log(useri)
  console.log(uservt)
  //const user= await this.usersrepository.query("SELECT * FROM users WHERE ID='"+ID+"' and vtoken='"+vtoken+"'");
  //console.log(user)
  
  if(useri && uservt)
    {
      const one:number=1
      await this.usersrepository.query("UPDATE users SET Isverified= '"+one+"' WHERE ID= '"+ID+"'");
      const vtoken1=null;
      const {Email} =useri
      await this.usersrepository.query("UPDATE users SET vtoken='"+vtoken1+"' WHERE Email = '"+Email+"'");
      return useri 
    }
  else
    {return "failed"}

}

async changepassreq(verifydto:VerifyUserdto)
{
  const {Email} = verifydto;
  
  const user = await this.usersrepository.findOne({where : {Email} });
  //console.log(user)
  //console.log(Email)
  //console.log("abc")
  if(user)
  {
      const vtoken:any=user.ResponseObject();
      this.updatevtoken(vtoken.access_token,vtoken.Email);
      this.chpasssmail(vtoken.access_token,vtoken.ID,vtoken.Email);
      //this.sendmail(vtoken,vtoken.ID,Email)
      //return user
  }
  else
  throw new HttpException("Error",HttpStatus.BAD_REQUEST);
}


async changepass(updateuser:UpdateUserDto){
  console.log("in change pass 1")
  const {vtoken}=updateuser;
  const{Password}=updateuser;
  const abc=null
  //const user = await this.usersrepository.findOne({where:{vtoken} });
  const user = await this.usersrepository.findOne({where : {vtoken} });
  if(user){

  const {ID}=user;
  this.usersrepository.query("UPDATE users SET Password='"+Password+"' WHERE ID = '"+ID+"'")
  this.usersrepository.query("UPDATE users SET vtoken='"+abc+"' WHERE ID = '"+ID+"'")
  }
  else{
    throw new HttpException("Error",HttpStatus.BAD_REQUEST);
  }

}

// async up_ver_st(verifyuserdto:VerifyUserdto){
//   const one:number=1
//   const {ID}= verifyuserdto;
//   const user = await this.usersrepository.findOne({where : {ID} });
//   if(!user){
//     throw new HttpException("user not found",HttpStatus.BAD_REQUEST);
//   }
//   else
//     await this.usersrepository.query("UPDATE users SET Isverified= '"+one+"' WHERE ID= '"+ID+"'");
// }s


  /* Delete User*/
  async remove(id: number)
  {
      const ID = id;
      const user = await this.usersrepository.findOne({where : {ID}});
      if(user)
      { /*remove await from here if here is error in delete*/await this.usersrepository.delete(id);
        //throw new HttpException("user found",HttpStatus.FOUND);
        return ` user #${id} deleted`;
      }
      else
      throw new HttpException("user not found",HttpStatus.BAD_REQUEST);
    
  }


}




