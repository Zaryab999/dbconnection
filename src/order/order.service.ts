import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
  @InjectRepository(Orders)
  private readonly orderrepository: Repository<Orders>){

  }
  async create(createOrderDto: CreateOrderDto) {
    console.log(createOrderDto)
    const order =this.orderrepository.create(createOrderDto)
    console.log(order)
    await this.orderrepository.save(order);
    return order;
  }

  async findAll() {
    return await this.orderrepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
