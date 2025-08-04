import { Controller, Get, Param,UsePipes,ValidationPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { GetPlayersDto } from 'src/dto/get-players.dto';

@Controller('players')
export class PlayersController {
    constructor(private readonly playersService:PlayersService){}

    @Get(':teamId')
    @UsePipes(new ValidationPipe({transform:true}))
    async getPlayers(@Param()params:GetPlayersDto){
        return await this.playersService.getPlayers(params.teamId);
    }
}
