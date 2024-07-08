import { seedRecipients } from './seeds/create-reciepients.seed';
import { seedSurveys } from './seeds/create-surveys.seed';

const main = async () => {
  await seedRecipients();
  await seedSurveys();
};

main();
