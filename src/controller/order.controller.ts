import { Body, Controller, Post, Get } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: Partial<Order>): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Get()
  async getAllOrders(): Promise<Order> {
    return this.orderService.getAllOrders();
  }

  @Get('/most-bought-meal')
  async getMostBoughtMeal(): Promise<Order> {
    return this.orderService.getMostBoughtMeal();
  }
}
