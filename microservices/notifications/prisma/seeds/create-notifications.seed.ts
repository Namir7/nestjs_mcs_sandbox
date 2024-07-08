import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

const notifications: Prisma.NotificationCreateInput[] = [
  {
    id: '66289566a13a3173c121bbf6',
    userId: 'adaf3b14-c6af-4c6f-ac5b-c5ff622a9c34',
    schoolId: 12,
    text: 'New course available',
    type: 'COURSE',
    action: 'NEW_COURSE_AVAILABLE',
    meta: {
      courseId: 1,
    },
    viewed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '66289566a13a3173f121bbf6',
    userId: 'adaf3b14-c6af-4c6f-ac5b-c5ff622a9c34',
    schoolId: 12,
    text: 'Subscriptions to "Aviator" course has expired',
    type: 'SUBSCRIPTION',
    action: 'SUBSCRIPTIONS_EXPIRED',
    meta: {
      courseId: 2,
    },
    viewed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '66289566a1ba3173f121bbf6',
    userId: 'adaf3b14-c6af-4c6f-ac5b-c5ff622a9c34',
    schoolId: 12,
    text: 'Subscriptions to "Marine Corps" course has expired',
    type: 'SUBSCRIPTION',
    action: 'SUBSCRIPTIONS_EXPIRED',
    meta: {
      courseId: 3,
    },
    viewed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '66289571a43386db38e6810d',
    userId: '869ab2b8-8be4-4eb5-90c9-7d8eeae62c9c',
    schoolId: 10,
    text: 'Withdrawal succeed',
    type: 'BILLING',
    action: 'WITHDRAWAL_ACCEPTED',
    meta: {},
    viewed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const seedNotifications = async () => {
  for (const notification of notifications) {
    await prisma.notification.create({ data: notification });
  }
};
