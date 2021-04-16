import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class loginUserDto {
    
      
    @IsString()
    @IsNotEmpty()
    readonly Email: string;
    
    @IsString()
    @IsNotEmpty()
    readonly Password: string;
   
}
