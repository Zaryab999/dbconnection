import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    TableForeignKey,
    Generated,
  } from 'typeorm';
   
  import { IsString, IsInt, IsNotEmpty, isString } from 'class-validator';
  @Entity()
  export class Products {
    @PrimaryGeneratedColumn()
    ID: number;
  
    @Column({unique:true})
    @IsNotEmpty()
    @IsString()
    Name: string;
    
    @Column()
    @IsString()
    Description: string;

    @Column()
    Active_ST: boolean;


    @Column({type:'datetime',nullable:true}) 
    Created_AT: Date;

    @Column()
    @IsNotEmpty()
    @IsString()
    Sku: string;

    @Column({unique:true})
    Subcat_ID: number;

    @IsString()
    @Column()
    Image: string;
    
    @Column()
    Price: number;
    
    }
   
  
