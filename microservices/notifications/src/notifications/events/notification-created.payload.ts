import { Notification } from '@prisma/client';
import { TargetClients } from 'src/settings/enums/target-clients.enum';

export class NotificationCreatedPayload {
  notification: Notification;
  targetClients: TargetClients;
}
