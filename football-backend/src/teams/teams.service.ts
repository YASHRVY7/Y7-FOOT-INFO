import { Injectable,HttpException,Logger } from '@nestjs/common';
import { ExternalApiService } from '../external-api/external-api.service';
import axios from 'axios';


@Injectable()
export class TeamsService {
    private readonly logger=new Logger(TeamsService.name);
    constructor(private externalApiService:ExternalApiService){}

    async getTeams(leagueId:string){
        try{
            const teams=await this.externalApiService.getTeams(leagueId);
            return teams;
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
