import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class ExternalApiService {
    private readonly apiKey = process.env.FOOTBALL_API_KEY;
    private readonly baseUrl = 'https://api.football-data.org/v4';
    private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hour cache TTL

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    private getHeaders() {
        return {
            'X-Auth-Token': this.apiKey,
        }
    }

    private async getWithCache<T>(key: string, callback: () => Promise<T>): Promise<T> {
        const cached = await this.cacheManager.get<T>(key);
        if (cached) {
            return cached;
        }
        const data = await callback();
        await this.cacheManager.set(key, data, this.CACHE_TTL);
        return data;
    }

    // http://localhost:3000/leagues
    async getLeagues() {
        return this.getWithCache('leagues', async () => {
            const url = `${this.baseUrl}/competitions`;
            const response = await axios.get(url, { headers: this.getHeaders() });
            return response.data;
        });
    }

    // http://localhost:3000/teams/PL
    async getTeams(competitionId: string) {
        return this.getWithCache(`teams_${competitionId}`, async () => {
            const url = `${this.baseUrl}/competitions/${competitionId}/teams`;
            const response = await axios.get(url, { headers: this.getHeaders() });
            return response.data.teams.map(team => ({
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
        });
    }

    // http://localhost:3000/players/64
    async getPlayers(teamId: string) {
        return this.getWithCache(`players_${teamId}`, async () => {
            const url = `${this.baseUrl}/teams/${teamId}`;
            const response = await axios.get(url, { headers: this.getHeaders() });
            return response.data.squad;
        });
    }

    // http://localhost:3000/standings/PL
    async getStandings(competitionId: string) {
        return this.getWithCache(`standings_${competitionId}`, async () => {
            const url = `${this.baseUrl}/competitions/${competitionId}/standings`;
            const response = await axios.get(url, { headers: this.getHeaders() });
            return response.data.standings;
        });
    }
}