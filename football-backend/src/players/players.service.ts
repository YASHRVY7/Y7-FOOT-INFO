import { Injectable,HttpException,Logger } from '@nestjs/common';
import { ExternalApiService } from 'src/external-api/external-api.service';
import axios from 'axios';


@Injectable()
export class PlayersService {
    private readonly logger=new Logger(PlayersService.name);
    constructor(private readonly externalApi:ExternalApiService){}

    async getPlayers(teamId:string){
        try{
            const players=await this.externalApi.getPlayers(teamId);
            return players;
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
