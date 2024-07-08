import { ForbiddenException, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard, UserId } from '@skufspace/lib';
import { Notification } from './entities/notification.entity';
import { NotificationsService } from './notifications.service';
import { CountRow } from './dto/get-count.dto';
import { FindAllDto } from './dto/find-all.dto';
import { ReadAllDto } from './dto/read-all.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParsePaginationPipe } from 'src/common/pipes/parse-pagination.pipe';

@Resolver(() => Notification)
@UseGuards(JwtAuthGuard)
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Query(() => [Notification])
  notifications(
    @UserId() userId: string,
    @Args('schoolId', { type: () => ID }, ParseIntPipe)
    schoolId: number,
    @Args('dto', { type: () => FindAllDto, nullable: true })
    dto: FindAllDto,
    @Args(
      'pagination',
      { type: () => PaginationDto, nullable: true },
      ParsePaginationPipe,
    )
    pagination: PaginationDto,
  ) {
    return this.notificationsService.findAll(userId, schoolId, dto, pagination);
  }

  @Query(() => [CountRow], { name: 'notificationsCount' })
  getCount(
    @UserId() userId: string,
    @Args('schoolId', { type: () => ID }, ParseIntPipe)
    schoolId: number,
  ) {
    return this.notificationsService.getCountByType(userId, schoolId);
  }

  @Mutation(() => Number)
  readAll(
    @UserId() userId: string,
    @Args('schoolId', { type: () => ID }, ParseIntPipe)
    schoolId: number,
    @Args('dto', { type: () => ReadAllDto, nullable: true })
    dto: ReadAllDto,
  ) {
    return this.notificationsService.readAll(userId, schoolId, dto);
  }

  @Mutation(() => Notification)
  async read(
    @UserId() userId: string,
    @Args('id', { type: () => ID })
    id: string,
  ) {
    const notification = await this.notificationsService.findOne(id);

    if (notification?.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.notificationsService.update(notification.id, {
      viewed: true,
    });
  }

  @Mutation(() => Notification)
  async markUnread(
    @UserId() userId: string,
    @Args('id', { type: () => ID })
    id: string,
  ) {
    const notification = await this.notificationsService.findOne(id);

    if (notification?.userId !== userId) {
      throw new ForbiddenException();
    }

    return this.notificationsService.update(notification.id, {
      viewed: false,
    });
  }
}
