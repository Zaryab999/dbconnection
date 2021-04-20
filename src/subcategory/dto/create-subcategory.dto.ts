import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateSubcategoryDto {

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
    Cat_ID :number



}
