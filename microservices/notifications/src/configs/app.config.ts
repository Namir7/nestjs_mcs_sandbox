import { resolveBool, resolveInt, resolveStr } from './utils';
import { registerAs } from '@nestjs/config';

export interface AppConfig {
  port: number;
  maxNotificationsPerUser: number;
  autoCleanup: boolean;
  cleanupStep: number;
  interappToken: string;
}

export const appConfig = registerAs('app', (): AppConfig => {
  const port = resolveInt('APP_PORT', process.env.APP_PORT, { default: 3000 });

  const maxNotificationsPerUser = resolveInt(
    'MAX_NOTIFICATIONS_PER_USER',
    process.env.MAX_NOTIFICATIONS_PER_USER,
    { default: 1000 },
  );

  const autoCleanup = resolveBool('AUTO_CLEAN_UP', process.env.AUTO_CLEAN_UP);
  const cleanupStep = parseInt(process.env.CLEAN_UP_STEP);
  const interappToken = resolveStr(
    'INTERAPP_TOKEN',
    process.env.INTERAPP_TOKEN,
  );

  return {
    port,
    maxNotificationsPerUser,
    autoCleanup,
    cleanupStep,
    interappToken,
  };
});
