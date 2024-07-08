import { NotificationsSettings } from '@prisma/client';
import { SettingsCategories } from '../enums/settings-categories.enum';
import { NotificationSound } from '../enums/notification-sound.enum';

export const DEFAULT_NOTIFICATION_SOUND: NotificationSound =
  NotificationSound.VOOP;

export const DEFAULT_TARGET_CLIENTS: Pick<
  NotificationsSettings,
  'platform' | 'browser' | 'mobile' | 'telegram' | 'email'
> = {
  /*
    TODO: set prod value
  */
  platform: [
    SettingsCategories.BILLLING,
    SettingsCategories.WEBINARS,
    SettingsCategories.AFFILIATE,
  ],
  browser: [SettingsCategories.BILLLING, SettingsCategories.AFFILIATE],
  mobile: [],
  telegram: [],
  email: [
    SettingsCategories.BILLLING,
    SettingsCategories.WEBINARS,
    SettingsCategories.AFFILIATE,
  ],
};

export type DefaultSettings = Omit<
  NotificationsSettings,
  'id' | 'userId' | 'schoolId' | 'createdAt' | 'updatedAt'
>;
