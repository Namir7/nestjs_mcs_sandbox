import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkSubgraphs } from './helpers/check-subgraphs';

async function bootstrap() {
  await checkSubgraphs();

  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('app.port');

  await app.listen(PORT);

  console.log(`\nGateway service listening on port ${PORT}`);
}

bootstrap();
