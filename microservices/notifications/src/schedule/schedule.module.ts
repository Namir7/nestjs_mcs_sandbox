import { DynamicModule, Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleModule as RootScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({})
export class ScheduleModule {
  static register(): DynamicModule {
    const providers = [];

    if (process.env.AUTO_CLEAN_UP === 'true') {
      providers.push(ScheduleService);
    }

    return {
      module: ScheduleModule,
      imports: [RootScheduleModule.forRoot(), NotificationsModule],
      providers,
    };
  }
}
