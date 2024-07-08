import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { NotificationsService } from 'src/notifications/notifications.service';

type NotificationUniqueEntry = {
  userId: string;
  schoolId: number;
};

type WithCount<T> = T & {
  count: number;
};

@Injectable()
export class ScheduleService {
  constructor(
    private notificationsService: NotificationsService,
    private configService: ConfigService,
  ) {}

  // TODO: check UTC
  @Cron('0 0 * * *')
  async handleCron() {
    const max = this.configService.get<number>('app.maxNotificationsPerUser');
    const cleanupStep = this.configService.get<number>('app.cleanupStep');

    //  const startDate = this._getYesterday();
    //  const endDate = new Date();

    const startDate = new Date('05-01-2023');
    const endDate = new Date('05-01-2025');

    const latest = await this.notificationsService.findByPeriod(
      startDate,
      endDate,
    );

    // 1. get { user_id, school_id } pairs by latest created notifications
    const entries: NotificationUniqueEntry[] = [];

    for (const { userId, schoolId } of latest) {
      const exist = entries.find(
        (entry) => entry.userId === userId && entry.schoolId === schoolId,
      );

      !exist && entries.push({ userId, schoolId });
    }

    const exeededEntries: WithCount<NotificationUniqueEntry>[] = [];

    // 2. get count
    for (const { userId, schoolId } of entries) {
      const count = await this.notificationsService.getCount(userId, schoolId);

      count >= max &&
        exeededEntries.push({
          userId,
          schoolId,
          count,
        });
    }

    // 3. get removable candidates
    const eldestNotificationsIds: string[] = [];

    for (const { userId, schoolId, count } of exeededEntries) {
      const limit = count - max + cleanupStep;

      const notificationsIds = await this.notificationsService.getEldestIds(
        userId,
        schoolId,
        limit,
      );

      eldestNotificationsIds.push(...notificationsIds);
    }

    //  4. remove
    console.log(`
    remove edlest notifications:
      max_items_per_user: ${max}
      clean_up_step: ${cleanupStep}
      for users: ${JSON.stringify(exeededEntries)}
    `);

    await this.notificationsService.removeBatch(eldestNotificationsIds);
  }

  private _getYesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    return date;
  }
}
