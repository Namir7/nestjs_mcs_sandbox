import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.APP_PORT) || 3000,
  }),
);
