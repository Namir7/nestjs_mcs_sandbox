import { NotificationMeta, NotificationType, Prisma } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { NotificationActions } from '../enums/notification-actions.enum';

export class CreateNotificationDto implements Prisma.NotificationCreateInput {
  @IsUUID()
  userId: string;

  @IsInt()
  schoolId: number;

  @IsString()
  @MaxLength(200)
  text: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsEnum(NotificationActions)
  action: string;

  @IsObject()
  @IsNotEmpty()
  meta: NotificationMeta;
}
