import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SettingsResolver } from './settings.resolver';

@Module({
  imports: [PrismaModule],
  providers: [SettingsService, SettingsResolver],
  exports: [SettingsService],
})
export class SettingsModule {}
