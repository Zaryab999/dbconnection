import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';


export class CreateUser_RoleDto {
    
    @Column()
    User_ID: number;
  
    @Column()
    Role_ID: number;
}
