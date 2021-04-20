import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import {subcategory} from 'src/subcategory/entities/subcategory.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([subcategory])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService]
})
export class SubcategoryModule {}
