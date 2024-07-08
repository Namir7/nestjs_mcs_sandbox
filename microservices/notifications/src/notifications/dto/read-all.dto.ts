import { Field, InputType } from '@nestjs/graphql';
import { NotificationType } from '@prisma/client';

@InputType()
export class ReadAllDto {
  @Field(() => NotificationType, { nullable: true })
  type?: NotificationType;
}
