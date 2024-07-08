import { Module } from '@nestjs/common';
import { WsService } from './ws.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [WsService],
})
export class WsModule {}
