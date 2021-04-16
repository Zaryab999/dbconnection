import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateCategoryDto {

    @Column({unique:true})
    @IsNotEmpty()
    @IsString()
    Name: string;
  
    @Column({nullable:true})
    Image: string;


    @Column({nullable:true}) 
    Description: string;
    
    @Column()
    @IsNotEmpty()
    @IsInt()
    U_ID :number



}
