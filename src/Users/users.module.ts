/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Users} from 'src/Users/entities/Users.entity';
import {userroles} from 'src/Users/entities/User_Roles.entity'
@Module({
  imports:[TypeOrmModule.forFeature([Users]),TypeOrmModule.forFeature([userroles])], 
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
