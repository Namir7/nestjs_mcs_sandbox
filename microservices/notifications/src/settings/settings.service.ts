import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TargetClients } from './enums/target-clients.enum';
import { Notification, NotificationsSettings } from '@prisma/client';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import {
  DEFAULT_NOTIFICATION_SOUND,
  DEFAULT_TARGET_CLIENTS,
  DefaultSettings,
} from './data/default-settings';
import { getSettingsCategoryByAction } from './enums/settings-categories.enum';
import { NotificationActions } from 'src/notifications/enums/notification-actions.enum';
import { CreateSettingsDto } from './dto/create-settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  findOne(userId: string, schoolId: number) {
    return this.prisma.notificationsSettings.findUnique({
      where: {
        userId_schoolId: {
          userId,
          schoolId,
        },
      },
    });
  }

  async setOne(userId: string, schoolId: number, dto: UpdateSettingsDto) {
    const settings = await this.findOne(userId, schoolId);

    if (settings) {
      return this.update(settings.id, dto);
    } else {
      return this.create(userId, schoolId, {
        ...this.getDefault(),
        ...dto,
      });
    }
  }

  create(userId: string, schoolId: number, dto: CreateSettingsDto) {
    return this.prisma.notificationsSettings.create({
      data: { userId, schoolId, ...dto },
    });
  }

  update(id: string, dto: UpdateSettingsDto): Promise<NotificationsSettings> {
    return this.prisma.notificationsSettings.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async getTargetClients(notification: Notification): Promise<TargetClients[]> {
    const { userId, schoolId } = notification;

    const settings = await this.prisma.notificationsSettings.findUnique({
      where: {
        userId_schoolId: {
          userId,
          schoolId,
        },
      },
    });

    const targetClients = this._computeTargetClients(
      notification,
      settings || (DEFAULT_TARGET_CLIENTS as NotificationsSettings),
    );

    return targetClients;
  }

  getDefault(): DefaultSettings {
    return {
      ...DEFAULT_TARGET_CLIENTS,
      sound: DEFAULT_NOTIFICATION_SOUND,
    };
  }

  private _computeTargetClients(
    { action }: Notification,
    settings: NotificationsSettings,
  ): TargetClients[] {
    const acc: TargetClients[] = [];

    const category = getSettingsCategoryByAction(action as NotificationActions);

    if (settings.platform.includes(category)) {
      acc.push(TargetClients.PLATFORM);
    }

    if (settings.browser.includes(category)) {
      acc.push(TargetClients.BROWSER);
    }

    if (settings.mobile.includes(category)) {
      acc.push(TargetClients.MOBILE);
    }

    if (settings.email.includes(category)) {
      acc.push(TargetClients.EMAIL);
    }

    if (settings.telegram.includes(category)) {
      acc.push(TargetClients.TELEGRAM);
    }

    return acc;
  }
}
