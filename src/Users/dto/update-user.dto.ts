import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';



export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsNotEmpty()
    readonly Name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly Password: string;
     
    @IsString()
    @IsNotEmpty()
    readonly Email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly vtoken: string;
    

}
