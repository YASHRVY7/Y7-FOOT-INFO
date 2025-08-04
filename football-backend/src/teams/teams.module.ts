import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports:[ExternalApiModule],
  controllers: [TeamsController],
  providers: [TeamsService]
})
export class TeamsModule {}
