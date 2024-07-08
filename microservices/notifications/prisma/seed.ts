import { seedNotifications } from './seeds/create-notifications.seed';

const main = async () => {
  await seedNotifications();
};

main();
