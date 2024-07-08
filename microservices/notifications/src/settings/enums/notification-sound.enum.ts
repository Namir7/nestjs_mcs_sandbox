import { registerEnumType } from '@nestjs/graphql';

export enum NotificationSound {
  VOOP = 'VOOP',
}

registerEnumType(NotificationSound, {
  name: 'NotificationSound',
});
