import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

export const recipients: Prisma.RecipientCreateInput[] = [
  {
    id: 'ae93fa70-ff15-4dc4-8a51-37908893bc3d',
    name: 'Frodo',
  },
  {
    id: 'a8b79eb4-ac7a-4c7d-a994-9b401cb858c6',
    name: 'Gendalf',
  },
];

export const seedRecipients = async () => {
  for (const recipient of recipients) {
    await prisma.recipient.create({ data: recipient });
  }
};
