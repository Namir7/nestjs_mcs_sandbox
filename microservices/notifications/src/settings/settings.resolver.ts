import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard, UserId } from '@skufspace/lib';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { NotificationsSettings } from './entities/notification-settings.entity';
import { SettingsService } from './settings.service';

@Resolver(() => NotificationsSettings)
@UseGuards(JwtAuthGuard)
export class SettingsResolver {
  constructor(private settingsService: SettingsService) {}

  @Query(() => NotificationsSettings, {
    name: 'notificationsSettings',
  })
  async findOne(
    @UserId() userId: string,
    @Args('schoolId', { type: () => ID }, ParseIntPipe)
    schoolId: number,
  ) {
    const settings = await this.settingsService.findOne(userId, schoolId);

    return settings || this.settingsService.getDefault();
  }

  @Mutation(() => NotificationsSettings, {
    name: 'setNotificationsSettings',
  })
  async setNotificationsSettings(
    @UserId() userId: string,
    @Args('schoolId', { type: () => ID }, ParseIntPipe)
    schoolId: number,
    @Args('dto', { type: () => UpdateSettingsDto })
    dto: UpdateSettingsDto,
  ) {
    return this.settingsService.setOne(userId, schoolId, dto);
  }
}
