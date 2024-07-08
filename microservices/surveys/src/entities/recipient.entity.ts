import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Recipient as Base } from '@prisma/client';

@ObjectType()
export class Recipient implements Base {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
