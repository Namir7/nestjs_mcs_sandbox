import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';
import { AxiosError } from 'axios';
import { NotificationEvents } from 'src/notifications/enums/notification-events.enum';
import { NotificationCreatedPayload } from 'src/notifications/events/notification-created.payload';
import { TargetClients } from 'src/settings/enums/target-clients.enum';
import { SendEmailDto } from './dto/send-email.dto';
import { NotificationsActionsToEmailsMap } from './types/notifications-to-emails';

@Injectable()
export class EmailsService {
  private baseUrl: string;
  private interappToken: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('emails.url');
    this.interappToken = this.configService.get<string>('app.interappToken');
  }

  @OnEvent(NotificationEvents.NOTIFICATION_CREATED)
  handleNotificationCreated({
    notification,
    targetClients,
  }: NotificationCreatedPayload) {
    // TODO: move to decorator
    if (!targetClients.includes(TargetClients.EMAIL)) {
      return;
    }

    const { userEmail: recipient, ...payload } = notification.meta;

    if (!recipient) {
      throw new Error(`User email not defined: ${notification.userId}`);
    }

    const template = NotificationsActionsToEmailsMap[notification.action];

    if (!template) {
      throw new Error(
        `Unknown email for notification action: ${notification.action}`,
      );
    }

    this._send({
      recipient,
      template,
      payload,
    });
  }

  private async _send(dto: SendEmailDto) {
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
      console.error('Got error due sending message to emails service: ', {
        code: error.code,
        message: error.message,
      } as AxiosError);
    }

    return result;
  }
}
