import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { ExternalApiModule } from '../external-api/external-api.module';

@Module({
  imports:[ExternalApiModule],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
