import { Field, InputType, Int } from '@nestjs/graphql';
import { NotificationSound } from '../enums/notification-sound.enum';

// TODO: add pipe validate
// non existing value ex: { platform: [999] }

@InputType()
export class CreateSettingsDto {
  @Field(() => NotificationSound)
  sound: string;

  @Field(() => [Int])
  platform: number[];

  @Field(() => [Int])
  browser: number[];

  @Field(() => [Int])
  mobile: number[];

  @Field(() => [Int])
  telegram: number[];

  @Field(() => [Int])
  email: number[];
}
