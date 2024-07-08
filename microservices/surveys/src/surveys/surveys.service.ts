import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string) {
    return this.prisma.survey.findUnique({
      where: {
        id,
      },
    });
  }

  findRecipients(id: string) {
    console.log('from find receipient');

    return this.prisma.recipient.findMany({
      where: {
        surveys: {
          some: {
            id,
          },
        },
      },
    });
  }
}
