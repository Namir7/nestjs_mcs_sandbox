import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationDto {
  @Field(() => Int)
  skip: number;

  @Field()
  take: number;
}
