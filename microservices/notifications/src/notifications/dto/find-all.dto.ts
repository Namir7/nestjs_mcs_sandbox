import { Field, InputType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@InputType()
export class FindAllDto {
  @Field(() => NotificationType, { nullable: true })
  type?: NotificationType;

  @Field(() => Boolean, { nullable: true })
  viewed?: boolean;
}
