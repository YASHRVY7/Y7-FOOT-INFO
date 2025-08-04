import { Controller, Get, Param,UsePipes,ValidationPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { GetTeamsDto } from 'src/dto/get-teams.dto';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService:TeamsService){}

    @Get(':competitionId')
    @UsePipes(new ValidationPipe({transform:true}))
    async getTeams(@Param()params:GetTeamsDto){
        return await this.teamsService.getTeams(params.competitionId);
    }
}
