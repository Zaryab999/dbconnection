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

        return `user ${Name} created `;
      }
      
      

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
      //console.log(user)
      if(!user || !(await user.compare(Password)))
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




