//import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {Products} from 'src/products/entities/product.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Products)
  private readonly Productsrepository: Repository<Products>
) { }


async create(createproductdto: CreateProductDto) 
{
   
   const {Name} = createproductdto;
   
   const product = await this.Productsrepository.findOne({where : {Name} });
   //console.log(category);
   
   if(product)
   {
     throw new HttpException('Product with this name already exists!! ',HttpStatus.BAD_REQUEST);
   }

   else
   {
     const cat = await this.Productsrepository.create(createproductdto);
     await this.Productsrepository.save(cat);
     return `Product: ${Name} created `;
   }
   

 }

  async findAll():Promise<Products[]> {
    let products = [];
    products= await this.Productsrepository.query("select * from Products where Active_ST=1");
    return products
  }

  async findOne(id: number)
  {
    const product= await this.Productsrepository.findOne(id)
    if(!product)
    throw new HttpException('no product with this id exists',HttpStatus.BAD_REQUEST);
    return product;
    
      
  }
  async finddetails(ID)
  {
    const product= await this.Productsrepository.query("select Products.Name,Products.Price,Products.ID,Products.Sku,Feature_Details.Feature_Value,Feature_Details.F_ID,Feature_Details.Pd_ID from((Products inner join productdetails on products.ID=productdetails.Pro_ID)inner join Feature_Details on productdetails.ID=Feature_Details.Pd_ID ) where Products.ID='"+ID+"'")
    
    if(!product)
      throw new HttpException('no product with this id exists',HttpStatus.BAD_REQUEST);
    
      return product;
  }
  async findspecdetails(ID)
  {
    const product = await this.Productsrepository.query("select * from Feature_Details where Pd_ID='"+ID+"'");
    return product;

  }
  async update(ID: number, updateproductDto:UpdateProductDto ) {
    const cat= await this.Productsrepository.findOne({where :{ID}})
    if(!cat)   
    {
      throw new HttpException("Category not found",HttpStatus.BAD_REQUEST);
    }
    else 
    {
      await this.Productsrepository.update({ID},updateproductDto);
      return "Product Updated";
      //return cat;
    }
    
  }
  async uniquely_identify_product(color:any,size:any){
    const product = await this.Productsrepository.query("uniquely_identify_product @f_value1='"+color+"',@f_value2='"+size+"' ")
    const{Pd_ID}=product
    //const product = await this.Productsrepository.query("find_user_role @f_value1='"+color+"'")
    if(!product)
      throw new HttpException('no product with this id exists',HttpStatus.BAD_REQUEST);
    console.log(Pd_ID)
    return product;

  }
  async remove(id: number)
  {
    const ID = id;
    const subcat = await this.Productsrepository.findOne({where : {ID}});
      
    if(subcat)
    { /*remove await from here if here is error in delete*/
      const{Name} =subcat;
      await this.Productsrepository.delete(id);
      //throw new HttpException("user found",HttpStatus.FOUND);
      return `Product:${Name}  Deleted`;
    }
      
    else
      throw new HttpException("Sub-Category not found",HttpStatus.BAD_REQUEST);
    
  }
  async getsizes(ID){
    const sizes = await this.Productsrepository.query("select * from Sizes where Pd_ID='"+ID+"'");
    return sizes;
  }
}
