import { PrismaClient, Prisma } from '@prisma/client';
import { recipients } from './create-reciepients.seed';

const prisma = new PrismaClient({
  log: ['query'],
});

const surveys: Prisma.SurveyCreateInput[] = [
  {
    id: '68969f15-a060-4929-863a-0077c6f0979e',
    label: 'Middle earth',
    vulnerableData: '0_72mj9',
    createdAt: new Date(),
    updatedAt: new Date(),
    recipients: {
      connect: {
        id: recipients[0].id,
      },
    },
  },
  {
    id: '1343c4be-d702-47c7-81ad-d3a82c1930c5',
    label: 'Mordor',
    vulnerableData: '1_jhe92k',
    createdAt: new Date(),
    updatedAt: new Date(),
    recipients: {
      connect: {
        id: recipients[0].id,
      },
    },
  },
  {
    id: '3fba9513-e1bd-4778-80a2-aa208abd7a73',
    label: null,
    vulnerableData: '2_923u2',
    createdAt: new Date(),
    updatedAt: new Date(),
    recipients: {
      connect: {
        id: recipients[1].id,
      },
    },
  },
];

export const seedSurveys = async () => {
  for (const user of surveys) {
    await prisma.survey.create({ data: user });
  }
};
