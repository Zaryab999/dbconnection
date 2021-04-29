import { IsString, IsInt, IsNotEmpty } from 'class-validator';


export class VerifyUserdto {
    
      
    @IsString()
    @IsNotEmpty()
    readonly ID: string;
    
    @IsString()
    @IsNotEmpty()
    readonly vtoken: string;

    @IsString()
    readonly Email:string
   
}
