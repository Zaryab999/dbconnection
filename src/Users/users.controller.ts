import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Users} from 'src/Users/entities/Users.entity';
import {loginUserDto} from 'src/Users/dto/loginUserDto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

   

  @Get()
  findAll() {
    return this.usersService.findAll();
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
  login (@Body() loginuserdto:loginUserDto){
    console.log("abcd");
    return this.usersService.login(loginuserdto);
  }

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

}
