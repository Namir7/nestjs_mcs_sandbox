import { registerAs } from '@nestjs/config';

export interface RmqConfig {
  url: string;
  queue: string;
}

export const rmqConfig = registerAs(
  'rmq',
  (): RmqConfig => ({
    url: process.env.RMQ_URL,
    queue: process.env.RMQ_QUEUE,
  }),
);
