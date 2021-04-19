import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from './dto/update-subcategory.dto';
import {subcategory} from 'src/subcategory/entities/subcategory.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class SubcategoryService {

  constructor(@InjectRepository(subcategory)
    private readonly subcategoryrepository: Repository<subcategory>
  ) { }

  async create(createsubcategorydto: CreateSubcategoryDto) 
  {
     
     const {Name} = createsubcategorydto;
     
     const category = await this.subcategoryrepository.findOne({where : {Name} });
     //console.log(category);
     
     if(category)
     {
       throw new HttpException('Sub-Category with this name already exists!! ',HttpStatus.BAD_REQUEST);
     }

     else
     {
       const cat = await this.subcategoryrepository.create(createsubcategorydto);
       await this.subcategoryrepository.save(cat);
       return `Sub-Category: ${Name} created `;
     }
     

   }
  async findAll():Promise<subcategory[]> {
    return await this.subcategoryrepository.find();
  }

  async findOne(id: number)
  {
    const subcat= await this.subcategoryrepository.findOne(id);
    if(!subcat)
    throw new HttpException('no sub-category with this id exists',HttpStatus.BAD_REQUEST);
    return subcat;
    
      
  }

  async update(ID: number, updatesubCategoryDto:UpdateCategoryDto ) {
    const cat= await this.subcategoryrepository.findOne({where :{ID}})
    if(!cat)   
    {
      throw new HttpException("Category not found",HttpStatus.BAD_REQUEST);
    }
    else 
    {
      await this.subcategoryrepository.update({ID},updatesubCategoryDto);
      return "Sub-Category Updated";
      //return cat;
    }
    
  }

  async remove(id: number)
  {
    const ID = id;
    const subcat = await this.subcategoryrepository.findOne({where : {ID}});
      
    if(subcat)
    { /*remove await from here if here is error in delete*/
      const{Name} =subcat;
      await this.subcategoryrepository.delete(id);
      //throw new HttpException("user found",HttpStatus.FOUND);
      return `${Name} Sub-Category Deleted`;
    }
      
    else
      throw new HttpException("Sub-Category not found",HttpStatus.BAD_REQUEST);
    
  }
}
