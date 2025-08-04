import { Module } from '@nestjs/common';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { ExternalApiModule } from '../external-api/external-api.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ExternalApiModule,
    CacheModule.register({
      ttl: 3600, // 1 hour
      max: 1000, // max 1000 items
    })
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService]
})
export class LeaguesModule {}
