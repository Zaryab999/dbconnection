import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Category} from 'src/category/entities/category.entity';

@Injectable()
export class CategoryService {
  
  
  constructor(@InjectRepository(Category)
    private readonly categoryrepository: Repository<Category>
  ) { }

  async create(createcategorydto: CreateCategoryDto) 
   {
      
      const {Name} = createcategorydto;
      
      const category = await this.categoryrepository.findOne({where : {Name} });
      //console.log(category);
      
      if(category)
      {
        throw new HttpException('Category with this name already exists!! ',HttpStatus.BAD_REQUEST);
      }

      else
      {
        const cat = await this.categoryrepository.create(createcategorydto);
        await this.categoryrepository.save(cat);
        return `category: ${Name} created `;
      }
      

    }


  async findAll():Promise<Category[]> {
    return await this.categoryrepository.find();;
  }

  
  
  async findOne(id: number)
  {
    const cat= await this.categoryrepository.findOne(id);
    if(!cat)
      return "There is no category with this id";
    return cat;
    
      
  }

  
  
  async update(ID: number, updateCategoryDto: UpdateCategoryDto) {
    const cat= await this.categoryrepository.findOne({where :{ID}})
    if(!cat)   
    {
      throw new HttpException("Category not found",HttpStatus.BAD_REQUEST);
    }
    else 
    {
      await this.categoryrepository.update({ID},updateCategoryDto);
      return "Category Updated";
      //return cat;
    }
    
  }

  
  async remove(id: number)
  {
    const ID = id;
    const user = await this.categoryrepository.findOne({where : {ID}});
      
    if(user)
    { /*remove await from here if here is error in delete*/
      const{Name} =user;
      //await this.categoryrepository.delete(id);
      await this.categoryrepository.query("delete_Category @catid='"+id+"' ");
      //throw new HttpException("user found",HttpStatus.FOUND);
      return `  ${Name} Category Deleted`;
    }
      
    else
      throw new HttpException("Category not found",HttpStatus.BAD_REQUEST);
    
  }

}
