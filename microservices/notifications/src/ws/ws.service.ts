import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto } from './dto/send-message.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationEvents } from 'src/notifications/enums/notification-events.enum';
import { NotificationCreatedPayload } from 'src/notifications/events/notification-created.payload';
import { TargetClients } from 'src/settings/enums/target-clients.enum';
import { AxiosError } from 'axios';

@Injectable()
export class WsService {
  private baseUrl: string;
  private interappToken: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('ws-service.url');
    this.interappToken = this.configService.get<string>('app.interappToken');
  }

  @OnEvent(NotificationEvents.NOTIFICATION_CREATED)
  handleNotificationCreated({
    notification,
    targetClients,
  }: NotificationCreatedPayload) {
    // TODO: move to decorator
    if (!targetClients.includes(TargetClients.PLATFORM)) {
      return;
    }

    this._send({
      clients: [notification.userId],
      event: notification.action,
      data: { text: notification.text, ...notification.meta },
    });
  }

  private async _send(dto: SendMessageDto) {
    let result;

    try {
      result = await this.httpService.axiosRef.post(
        this.baseUrl + '/send',
        dto,
        {
          headers: {
            'x-inter-app': this.interappToken,
          },
        },
      );
    } catch (error) {
      console.error('Got error due sending message to ws-service: ', {
        code: error.code,
        message: error.message,
      } as AxiosError);
    }

    return result;
  }
}
