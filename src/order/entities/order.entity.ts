import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    TableForeignKey,
    Generated,
  } from 'typeorm';
   
  import { IsString, IsInt, IsNotEmpty, isString } from 'class-validator';
  @Entity()
  export class Orders {
    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    User_ID:number;
    
    @Column()
    Discount:Number
    
    

    @Column()
    Order_ST:number
    
    @Column()
    DC: number;
   
    @Column()
    Price:number;

    @Column()
    OrderDate:number;

    
  
}