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
    ID: number
    
    @Column()
    User_ID:number
    
    @Column()
    Discount:number
    
    

    @Column()
    Order_ST:string
    
    @Column()
    DC: number
   
    @Column()
    Price:number

    @Column()
    OrderDate:number

    
  
}