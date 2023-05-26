import { Knex } from 'knex';
import { Order } from '../models/order.model';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(
    private knex: Knex,
    @Inject('RABBITMQ_CONNECTION') private readonly rabbitmqClient: ClientProxy,
  ) {}

  async createOrder(order: Partial<Order>): Promise<Order> {
    const [id] = await this.knex('orders')
      .insert({
        user_id: 1,
        completed: false,
        cancelled: false,
        kitchen_cancelled: false,
        kitchen_accepted: false,
        kitchen_dispatched: false,
        kitchen_dispatched_time: null,
        completed_time: null,
        rider_id: 1,
        kitchen_prepared: false,
        rider_assigned: false,
        paid: false,
        order_code: '',
        calculated_order_id: '',
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('id');

    const logMessage = {
      event: 'order.created',
      orderId: id,
      timestamp: new Date().toISOString(),
    };

    this.rabbitmqClient.emit('order_logs', logMessage);

    const newOrder = await this.getOrderById(id);
    return newOrder;
  }

  async getAllOrders() {
    return this.knex.raw(`
        SELECT 
            orders.*,
            logs.id as logs_id, logs.time, logs.text,
            calculated_orders.id as calculated_orders_id, calculated_orders.meals, calculated_orders.total_amount, calculated_orders.free_delivery, calculated_orders.delivery_fee, calculated_orders.service_charge, calculated_orders.address_details,
            riders.id as riders_id, riders.first_name, riders.last_name,
            users.id as users_id, users.username
        FROM orders
        LEFT JOIN logs ON orders.id = logs.order_id
        LEFT JOIN calculated_orders ON orders.id = calculated_orders.order_id
        LEFT JOIN riders ON orders.rider_id = riders.id
        LEFT JOIN users ON orders.user_id = users.id
    `);
  }

  async getMostBoughtMeal() {
    const result = await this.knex
      .select(
        this.knex.raw("meal->>'name' as meal_name"),
        this.knex.raw("SUM((meal->>'quantity')::int) as total_quantity"),
      )
      .from('calculated_orders')
      .crossJoin(
        this.knex.raw('json_array_elements(calculated_orders.meals) as meal'),
      )
      .groupBy(this.knex.raw("meal->>'name'"))
      .orderBy('total_quantity', 'desc')
      .limit(1);

    return result;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.knex('orders').where({ id }).first();
    return order;
  }
}
