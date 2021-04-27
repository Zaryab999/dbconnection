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
    return await this.Productsrepository.find();
  }

  async findOne(id: number)
  {
    const product= await this.Productsrepository.findOne(id);
    if(!product)
    throw new HttpException('no product with this id exists',HttpStatus.BAD_REQUEST);
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
}
