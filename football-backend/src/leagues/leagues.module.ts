import { Module } from '@nestjs/common';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports:[ExternalApiModule],
  controllers: [LeaguesController],
  providers: [LeaguesService]
})
export class LeaguesModule {}
