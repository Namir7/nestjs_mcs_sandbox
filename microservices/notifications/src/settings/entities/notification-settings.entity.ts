import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { NotificationsSettings as Base } from '@prisma/client';
import { NotificationSound } from '../enums/notification-sound.enum';

registerEnumType(NotificationSound, {
  name: 'NotificationSound',
});

@ObjectType()
export class NotificationsSettings implements Base {
  id: string;

  userId: string;

  schoolId: number;

  createdAt: Date;

  updatedAt: Date;

  @Field(() => NotificationSound)
  sound: string;

  @Field(() => [Int])
  platform: number[];

  @Field(() => [Int])
  browser: number[];

  @Field(() => [Int])
  mobile: number[];

  @Field(() => [Int])
  telegram: number[];

  @Field(() => [Int])
  email: number[];
}
