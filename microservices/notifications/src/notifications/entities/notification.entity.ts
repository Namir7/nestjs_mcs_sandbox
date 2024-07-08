import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  Notification as Base,
  NotificationMeta,
  NotificationType,
} from '@prisma/client';
import GraphQLJSON from 'graphql-type-json';

registerEnumType(NotificationType, {
  name: 'NotificationType',
});

@ObjectType()
export class Notification implements Base {
  userId: string;

  schoolId: number;

  @Field(() => ID)
  id: string;

  @Field()
  text: string;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  action: string;

  @Field(() => GraphQLJSON)
  meta: NotificationMeta;

  @Field()
  viewed: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
