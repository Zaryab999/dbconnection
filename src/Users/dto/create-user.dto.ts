
  import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly Name: string;
    
    @IsString()
    @IsNotEmpty()
    readonly Password: string;
     
    @IsString()
    @IsNotEmpty()
    readonly Email: string;
}
