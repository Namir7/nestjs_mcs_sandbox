import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [EmailsService],
})
export class EmailsModule {}
