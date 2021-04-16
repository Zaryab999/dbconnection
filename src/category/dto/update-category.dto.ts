import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @Column({unique:true})
    @IsNotEmpty()
    @IsString()
    Name: string;
  
    @Column({nullable:true})
    Image: string;


    @Column({nullable:true}) 
    Description: string;

}
