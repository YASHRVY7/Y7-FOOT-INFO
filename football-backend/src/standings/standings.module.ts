import { Module } from '@nestjs/common';
import { StandingsController } from './standings.controller';
import { StandingsService } from './standings.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports:[ExternalApiModule],
  controllers: [StandingsController],
  providers: [StandingsService]
})
export class StandingsModule {}
