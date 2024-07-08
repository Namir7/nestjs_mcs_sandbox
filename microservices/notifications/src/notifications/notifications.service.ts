import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FindAllDto } from './dto/find-all.dto';
import { ReadAllDto } from './dto/read-all.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  findOne(id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(
    userId: string,
    schoolId: number,
    dto?: FindAllDto,
    pagination?: PaginationDto,
  ) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
        schoolId,
        ...dto,
      },
      orderBy: [
        {
          viewed: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      ...pagination,
    });

    return notifications;
  }

  async findByPeriod(start: Date, end: Date) {
    return this.prisma.notification.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  async getEldestIds(userId: string, schoolId: number, limit: number) {
    const ids = await this.prisma.notification.findMany({
      where: {
        AND: {
          userId,
          schoolId,
        },
      },
      select: {
        id: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: limit,
    });

    return ids.map(({ id }) => id);
  }

  async getCount(userId: string, schoolId?: number) {
    return this.prisma.notification.count({
      where: {
        userId,
        ...(!!schoolId && { schoolId }),
      },
    });
  }

  getCountByType(userId: string, schoolId: number) {
    return this.prisma.notification.aggregateRaw({
      pipeline: [
        {
          $match: { userId, schoolId },
        },
        {
          $group: {
            _id: '$type',
            countAll: { $sum: 1 },
            countUnread: {
              $sum: {
                $cond: [{ $eq: ['$viewed', false] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            type: '$_id',
            countAll: 1,
            countUnread: 1,
          },
        },
      ],
    });
  }

  async create(dto: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({
      data: dto,
    });
  }

  update(id: string, { viewed }: UpdateNotificationDto) {
    return this.prisma.notification.update({
      where: {
        id,
      },
      data: {
        viewed,
      },
    });
  }

  async readAll(
    userId: string,
    schoolId: number,
    dto?: ReadAllDto,
  ): Promise<number> {
    const { count } = await this.prisma.notification.updateMany({
      where: {
        userId,
        schoolId,
        type: dto?.type,
        viewed: false,
      },
      data: {
        viewed: true,
      },
    });

    return count;
  }

  async remove(id: string) {
    return this.prisma.notification.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(ids: string[]) {
    return this.prisma.$transaction((tx) =>
      tx.notification.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      }),
    );
  }
}
