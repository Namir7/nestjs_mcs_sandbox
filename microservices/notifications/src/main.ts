import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('app.port');
  const RMQ_URL = configService.get<string>('rmq.url');
  const RMQ_QUEUE = configService.get<string>('rmq.queue');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RMQ_URL],
      queue: RMQ_QUEUE,
    },
  });

  await app.listen(PORT);

  // TODO: rewrite ?
  await app.startAllMicroservices();

  console.log('\nnotifications service listening on port:', PORT);
}
bootstrap();
