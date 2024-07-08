import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const { port } = configService.get<AppConfig>('app');

  await app.listen(port);

  console.log('\nsurveys service listening on port:', port);
}
bootstrap();
