import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@skufspace/lib';
import GraphQLJSON from 'graphql-type-json';
import { appConfig } from './configs/app.config';
import { rmqConfig } from './configs/rmq.config';
import { wsServiceConfig } from './configs/ws-service.config';
import { EmailsModule } from './emails/emails.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { TelegramModule } from './telegram/telegram.module';
import { WsModule } from './ws/ws.module';
import { ScheduleModule } from './schedule/schedule.module';
import { emailsConfig } from './configs/emails.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, rmqConfig, wsServiceConfig, emailsConfig],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      // TODO: disable on prod
      playground: true,
      autoSchemaFile: true,
      resolvers: {
        JSON: GraphQLJSON,
      },
    }),
    EventEmitterModule.forRoot(),
    AuthModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ScheduleModule.register(),
    NotificationsModule,
    WsModule,
    SettingsModule,
    EmailsModule,
    TelegramModule,
    ScheduleModule,
  ],
})
export class AppModule {}
