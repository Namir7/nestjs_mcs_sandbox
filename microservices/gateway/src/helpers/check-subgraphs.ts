import axios from 'axios';
import { config } from 'dotenv';

config();

const NOTIFICATIONS_URL = process.env.GQL_NOTIFICATIONS_SERVICE_URL;
const SURVEYS_URL = process.env.GQL_SURVEYS_SERVICE_URL;

const SUBGRAPHS = [
  {
    serviceName: 'notifications',
    index: 0,
    endpoint: NOTIFICATIONS_URL,
  },
  {
    serviceName: 'surveys',
    index: 1,
    endpoint: SURVEYS_URL,
  },
];

export const checkSubgraphs = async () => {
  const pollingInterval = 3000;

  SUBGRAPHS.forEach(({ serviceName, endpoint }) => {
    if (!endpoint) {
      throw new Error(`undefined enpoint on service ${serviceName}`);
    }
  });

  const success: { serviceName: string; success: boolean }[] = SUBGRAPHS.map(
    ({ serviceName, index }) => ({ serviceName, index, success: false }),
  );

  let isAllSubgraphsSuccess = success.every(({ success }) => success === true);

  while (!isAllSubgraphsSuccess) {
    for (const subgraph of SUBGRAPHS) {
      try {
        await axios.get(subgraph.endpoint);
      } catch (error) {
        const statusCode = error.request?.res?.statusCode;

        if (statusCode === 400) {
          success[subgraph.index].success = true;

          isAllSubgraphsSuccess = success.every(
            ({ success }) => success === true,
          );

          continue;
        }

        console.error(
          `can't get ${subgraph.serviceName} service on ${subgraph.endpoint}`,
        );
      }
    }

    await waitForIt(pollingInterval);
  }
};

const waitForIt = (timeout = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), timeout));
};
