import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CustomerModule } from './customer/customer.module';
import {TypeOrmModule} from'@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './Users/users.module';
import {UsersController} from'src/Users/users.controller'
import { UsersService } from 'src/users/users.service';
import { CategoryModule } from './category/category.module';

import { SubcategoryService } from './subcategory/subcategory.service';
import { SubcategoryModule } from './subcategory/subcategory.module';

//import {usersrepository} from UsersService;
@Module({
  imports: [DatabaseModule, UsersModule, CategoryModule,  SubcategoryModule],
  controllers: [AppController ],
  providers: [AppService]
})
export class AppModule {}
