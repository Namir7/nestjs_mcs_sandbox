import { registerAs } from '@nestjs/config';

export interface WsServiceConfig {
  url: string;
}

export const wsServiceConfig = registerAs(
  'ws-service',
  // TODO: Should validation env params here
  (): WsServiceConfig => ({
    url: process.env.WS_SERVICE_URL,
  }),
);
