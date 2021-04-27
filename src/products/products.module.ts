import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {Products} from 'src/products/entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([Products])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
