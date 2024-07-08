import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindNotificationsDto {
  userId: string;

  @Field()
  schoolId: number;
}
