import { Controller, Get, Param,UsePipes,ValidationPipe } from '@nestjs/common';
import{StandingsService} from './standings.service';
import { GetStandingsDto } from 'src/dto/get-standings.dto';


@Controller('standings')
export class StandingsController {
    constructor(private readonly standingsService:StandingsService){}

    @Get(':competitionId')
    @UsePipes(new ValidationPipe({transform:true}))
    async getStandings(@Param()params:GetStandingsDto){
        return await this.standingsService.getStandings(params.competitionId);
    }
}
