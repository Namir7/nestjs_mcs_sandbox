import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SettingsModule } from 'src/settings/settings.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [PrismaModule, SettingsModule],
  providers: [NotificationsService, NotificationsResolver],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
