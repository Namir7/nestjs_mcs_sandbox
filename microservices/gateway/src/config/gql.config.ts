import { registerAs } from '@nestjs/config';

interface GqlConfig {
  notificationsServiceUrl: URL;
  surveysServiceUrl: URL;
}

export const gqlConfig = registerAs('gql', (): GqlConfig => {
  return {
    notificationsServiceUrl: new URL(process.env.GQL_NOTIFICATIONS_SERVICE_URL),
    surveysServiceUrl: new URL(process.env.GQL_SURVEYS_SERVICE_URL),
  };
});
