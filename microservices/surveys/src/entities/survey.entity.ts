import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Survey as Base } from '@prisma/client';
import { Recipient } from './recipient.entity';

@ObjectType()
export class Survey implements Omit<Base, 'vulnerableData'> {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  label: string;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => [Recipient])
  recipients?: Recipient[];
}
