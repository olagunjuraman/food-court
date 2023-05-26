import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_CONNECTION',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ldafvvol:7IKirPkdXbHOivUpmAe3tgV6dMWmxMsQ@shrimp.rmq.cloudamqp.com/ldafvvol',
          ], // Replace with your RabbitMQ connection URL
          queue: 'orders', // Replace with your queue name
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class RabbitMQModule {}
