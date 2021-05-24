import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @Get('details/:id')
  finddetails(@Param('id') id: string){
    return this.productsService.finddetails(id)
  }
  @Get('unique/:color/:size')
  finduniqueproduct(@Param('color')color:any,@Param ('size')size:any){
    return this.productsService.uniquely_identify_product(color,size)
  }

  @Get('specdetails/:id')
  findspecdetails(@Param('id') id: string){
    console.log("in controller")
    return this.productsService.findspecdetails(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
