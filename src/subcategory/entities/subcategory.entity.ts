import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    TableForeignKey,
    Generated,
  } from 'typeorm';
   
  import { IsString, IsInt, IsNotEmpty } from 'class-validator';
  @Entity()
  export class subcategory {
    @PrimaryGeneratedColumn()
    ID: number;
  
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
    Cat_ID: number;
    
    }
   
  
