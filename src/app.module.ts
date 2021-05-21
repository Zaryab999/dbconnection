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
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { SubcategoryService } from './subcategory/subcategory.service';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';

//import {usersrepository} from UsersService;
@Module({
   imports: [
  //   MailerModule.forRoot({
  //     transport: 'smtps://user@domain.com:pass@smtp.domain.com',
  //     defaults: {
  //       from: '"nest-modules" <modules@nestjs.com>',
  //     },
  //     template: {
  //       dir: __dirname + '/templates',
  //       adapter: new PugAdapter(),
  //       options: {
  //         strict: true,
  //       },
  //     },
  //   }),
  DatabaseModule, UsersModule, CategoryModule,  SubcategoryModule, ProductsModule, OrderModule],
  controllers: [AppController ],
  providers: [AppService]
})
export class AppModule {}
