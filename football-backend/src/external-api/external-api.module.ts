import { Module } from '@nestjs/common';
import { ExternalApiService } from './external-api.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // 1 hour
      max: 1000, // max 1000 items
    })
  ],
  providers: [ExternalApiService],
  exports: [ExternalApiService, CacheModule]
})
export class ExternalApiModule {}
