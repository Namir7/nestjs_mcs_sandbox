import {
  Resolver,
  Query,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Survey } from 'src/entities/survey.entity';
import { Recipient } from 'src/entities/recipient.entity';
import { SurveysService } from './surveys.service';

@Resolver(() => Survey)
export class SurveysResolver {
  constructor(private surveysService: SurveysService) {}

  @Query(() => Survey, { nullable: true })
  survey(@Args('id', { type: () => ID }) id: string): Promise<Survey> {
    return this.surveysService.findOne(id);
  }

  @ResolveField(() => [Recipient])
  async recipients(@Parent() survey: Survey): Promise<Recipient[]> {
    const { id: dateId } = survey;

    return this.surveysService.findRecipients(dateId);
  }
}
