import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExternalApiModule } from './external-api/external-api.module';
import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { StandingsModule } from './standings/standings.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ExternalApiModule, LeaguesModule, TeamsModule, PlayersModule, StandingsModule,
    CacheModule.register({
      ttl: 60*60,//1 hour
      max: 100, //max 100 items
      isGlobal:true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
