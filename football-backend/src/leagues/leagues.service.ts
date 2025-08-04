import { Injectable, HttpException, Logger, Inject } from '@nestjs/common';
import { ExternalApiService } from '../external-api/external-api.service';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class LeaguesService {
    private readonly logger = new Logger(LeaguesService.name);
    private readonly CACHE_TTL = 3600; // 1 hour

    constructor(
        private externalApi: ExternalApiService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    async getLeagues(){
        const cacheKey = 'leagues_data';
        
        // Try to get cached data first
        const cachedData = await this.cacheManager.get(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        try {
            const data = await this.externalApi.getLeagues();
            // Cache the successful response
            await this.cacheManager.set(cacheKey, data, this.CACHE_TTL);
            return data;
        } catch (error) {
            this.logger.error('Error fetching leagues', error.message);
            
            // Try to get cached data again in case of error
            const staleData = await this.cacheManager.get(cacheKey);
            if (staleData) {
                this.logger.log('Returning stale data from cache due to error');
                return staleData;
            }
            
            // If no stale data, throw appropriate error
            if (axios.isAxiosError(error)) {
                const status = error.response?.status || 500;
                const message = status === 403 
                    ? 'API rate limit exceeded. Please try again later.'
                    : error.response?.data?.message || 'Error fetching leagues';
                
                throw new HttpException(
                    { statusCode: status, message },
                    status
                );
            }
            
            throw new HttpException(
                { statusCode: 500, message: 'Internal server error' },
                500
            );
        }
    }
}
