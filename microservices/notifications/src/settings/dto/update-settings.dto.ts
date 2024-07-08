import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSettingsDto } from './create-settings.dto';

@InputType()
export class UpdateSettingsDto extends PartialType(CreateSettingsDto) {}
