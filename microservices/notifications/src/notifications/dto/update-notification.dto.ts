import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationDto {
  @Field(() => GraphQLISODateTime, { nullable: true })
  viewed: boolean;
}
