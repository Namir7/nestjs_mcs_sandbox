import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SurveysResolver } from './surveys.resolver';

@Module({
  imports: [PrismaModule],
  providers: [SurveysService, SurveysResolver],
  controllers: [SurveysController],
})
export class SurveysModule {}
