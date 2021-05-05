import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {CreateUser_RoleDto} from './dto/createuser_role.dto'
import {Users} from 'src/Users/entities/Users.entity';
import {loginUserDto} from 'src/Users/dto/loginUserDto';
import {VerifyUserdto} from 'src/Users/dto/verifyuser.dto';
//import { UpdateUserDto} from 'src/Users/dto/updateuser.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email')
  findOnebyemail(@Body() loginuserdto:loginUserDto) {
    return this.usersService.findOnebyemail(loginuserdto);
  }
  
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
 async remove(@Param('id') id: number) {
    return await this.usersService.remove(+id);
  }
  
  @Post('login')
  async login (@Body() loginuserdto:loginUserDto){
    return await this.usersService.login(loginuserdto);
  }

   @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
     return await this.usersService.create(createUserDto);
   }
  @Post('assign-role')
  async createrole(@Body() createUserroleDto: CreateUser_RoleDto) {
    return await this.usersService.assignrole(createUserroleDto);
  }
  @Patch(':id/:id1')
  async updaterole(@Param('id') id: number,@Param('id1') id1:number) {
    return await this.usersService.updaterole(id,id1);
  } 
  @Post('verify')
  
  async verify(@Body() verifyUserDto: VerifyUserdto) {
    console.log("in@post")
    return await this.usersService.verifyemail(verifyUserDto);
  }
  
  @Post('changepassreq')
  async changepassreq(@Body() verifyUserDto: VerifyUserdto) {
    console.log("in change pass request")
    return await this.usersService.changepassreq(verifyUserDto);
  }
  @Post('changepass')
  async changepass(@Body() updateUserDto: UpdateUserDto) {
    console.log("in change pass")
    return await this.usersService.changepass(updateUserDto);
  }

  
  
}
