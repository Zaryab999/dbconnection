
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    
    @Column({unique:true})
    @IsNotEmpty()
    @IsString()
    Name: string;
    
    @Column()
    @IsString()
    Description: string;

    @Column()
    Active_ST: boolean;


    @Column()
    @IsNotEmpty()
    @IsString()
    Sku: string;

}
