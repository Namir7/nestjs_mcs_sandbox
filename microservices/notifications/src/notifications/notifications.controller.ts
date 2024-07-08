import { Controller, ValidationPipe } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SettingsService } from 'src/settings/settings.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationEvents } from './enums/notification-events.enum';
import { NotificationsService } from './notifications.service';

enum EventPatterns {
  CREATE_NOTIFICATION = 'notifications.notification.create',
}

@Controller('notifications')
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
    private settingsService: SettingsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @EventPattern(EventPatterns.CREATE_NOTIFICATION)
  async create(@Payload(ValidationPipe) dto: CreateNotificationDto) {
    // TODO: handle wrong data type ?
    // add validation
    const notification = await this.notificationsService.create(dto);

    const targetClients = await this.settingsService.getTargetClients(
      notification,
    );

    this.eventEmitter.emit(NotificationEvents.NOTIFICATION_CREATED, {
      notification,
      targetClients,
    });
  }
}
