import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
     
    
    @IsNotEmpty()
    readonly User_ID: any;
    
    
    
    readonly Discount: any;
    
  
    readonly Order_ST: any;

   
    readonly DC: any
    
    
    readonly Price: any
    

}
