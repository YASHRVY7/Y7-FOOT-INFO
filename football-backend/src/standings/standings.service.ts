import { Injectable,HttpException,Logger } from '@nestjs/common';
import { ExternalApiService } from 'src/external-api/external-api.service';
import axios from 'axios';


@Injectable()
export class StandingsService {
    private readonly logger=new Logger(StandingsService.name);
    constructor(private readonly externalApi:ExternalApiService){}

    async getStandings(competitionId:string){
        try{
            const standings=await this.externalApi.getStandings(competitionId);
            return standings;
        }
        catch(err){
            if (axios.isAxiosError(err)) {
                this.logger.error('External API error', err.response?.data);
                throw new HttpException(
                    err.response?.data || 'External API error',
                    err.response?.status || 500
                );
            }
            this.logger.error('Internal server error', err.message);
            throw new HttpException('Internal server error', 500);
        }
    }
}
