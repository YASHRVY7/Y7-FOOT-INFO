import { Injectable } from '@nestjs/common';
import axios from 'axios';



@Injectable()
export class ExternalApiService {
    private readonly apiKey=process.env.FOOTBALL_API_KEY;
    private readonly baseUrl='https://api.football-data.org/v4';

    private getHeaders(){
        return {
            'X-Auth-Token': this.apiKey,
        }
    }

    // http://localhost:3000/leagues
    async getLeagues(){
        const url=`${this.baseUrl}/competitions`;
        const response=await axios.get(url,{headers:this.getHeaders()});
        return response.data.competitions.filter((league:any)=>league.type==='LEAGUE');
    }

    // http://localhost:3000/teams/PL
    async getTeams(competitionId:string){
        const url=`${this.baseUrl}/competitions/${competitionId}/teams`;
        const response=await axios.get(url,{headers:this.getHeaders()});
        return response.data.teams.map((team: any) => ({
            id: team.id,
            name: team.name,
            shortName: team.shortName,
            tla: team.tla,
            crest: team.crest,
            venue: team.venue,
            founded: team.founded,
            clubColors: team.clubColors,
            coach: team.coach ? {
                id: team.coach.id,
                firstName: team.coach.firstName,
                lastName: team.coach.lastName,
                name: team.coach.name,
                dateOfBirth: team.coach.dateOfBirth,
                nationality: team.coach.nationality,
                contract: team.coach.contract ? {
                    start: team.coach.contract.start,
                    until: team.coach.contract.until
                } : null
            } : null
        }));
    }

    // http://localhost:3000/players/64
    async getPlayers(teamId:string){
        const url=`${this.baseUrl}/teams/${teamId}`;
        const response=await axios.get(url,{headers:this.getHeaders()});
        return response.data.squad;
    }

    // http://localhost:3000/standings/PL
    async getStandings(competitionId:string){
        const url=`${this.baseUrl}/competitions/${competitionId}/standings`;
        const response=await axios.get(url,{headers:this.getHeaders()});
        return response.data.standings;
    }

}
 