import { registerAs } from '@nestjs/config';

export interface EmailsConfig {
  url: string;
}

export const emailsConfig = registerAs(
  'emails',
  (): EmailsConfig => ({
    url: process.env.EMAILS_SERVICE_URL,
  }),
);
