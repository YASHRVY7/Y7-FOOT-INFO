import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';



@Injectable()
export class ExternalApiService {
    private readonly apiKey=process.env.FOOTBALL_API_KEY;
    private readonly baseUrl='https://api.football-data.org/v4';
    private readonly CACHE_TTL = 3600; // Cache for 1 hour

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    private getHeaders(){
        return {
            'X-Auth-Token': this.apiKey,
        }
    }

    // http://localhost:3000/leagues
    async getLeagues(){
        const cacheKey = 'all_leagues';
        const cachedData = await this.cacheManager.get(cacheKey);
        
        if (cachedData) {
            return cachedData;
        }

        try {
            const url = `${this.baseUrl}/competitions`;
            const response = await axios.get(url, { 
                headers: this.getHeaders(),
                validateStatus: (status) => status < 500 // Don't throw for 4xx errors
            });
            
            const leagues = response.data.competitions.filter((league: any) => league.type === 'LEAGUE');
            await this.cacheManager.set(cacheKey, leagues, this.CACHE_TTL);
            return leagues;
        } catch (error) {
            if (error.response?.status === 403) {
                // Return cached data if available
                const staleData = await this.cacheManager.get(cacheKey);
                if (staleData) return staleData;
                throw new Error('API rate limit exceeded. Please try again later.');
            }
            throw error;
        }
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
 