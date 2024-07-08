import { Injectable, NotImplementedException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationEvents } from 'src/notifications/enums/notification-events.enum';
import { NotificationCreatedPayload } from 'src/notifications/events/notification-created.payload';
import { TargetClients } from 'src/settings/enums/target-clients.enum';

@Injectable()
export class TelegramService {
  @OnEvent(NotificationEvents.NOTIFICATION_CREATED)
  handleNotificationCreated({
    notification,
    targetClients,
  }: NotificationCreatedPayload) {
    // TODO: move to decorator
    if (!targetClients.includes(TargetClients.TELEGRAM)) {
      return;
    }

    throw new NotImplementedException('telegram sending not implemented');
  }
}
