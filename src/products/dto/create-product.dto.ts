
import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateProductDto {

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

    @Column({unique:true})
    Subcat_ID: number;




}
