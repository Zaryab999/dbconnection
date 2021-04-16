import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {UsersController} from'src/Users/users.controller';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
