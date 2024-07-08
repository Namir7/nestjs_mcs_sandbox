import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@ObjectType()
export class CountRow {
  @Field(() => Int)
  countAll: number;

  @Field(() => Int)
  countUnread: number;

  @Field(() => NotificationType)
  type: NotificationType;
}
