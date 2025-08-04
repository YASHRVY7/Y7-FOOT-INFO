import { Routes } from '@angular/router';
import { LeaguesComponent } from './components/leagues/leagues.component';
import { TeamsComponent } from './components/teams/teams.component';
import { PlayersComponent } from './components/players/players.component';
import { StandingsComponent } from './components/standings/standings.component';




export const routes: Routes = [
    { path: 'leagues', component: LeaguesComponent },
    { path: 'teams/:leagueId', component: TeamsComponent },
    { path: 'players/:teamId', component: PlayersComponent },
    { path: 'standings/:competitionId', component: StandingsComponent },
    { path: '', redirectTo: '/leagues', pathMatch: 'full' },
    { path: '**', redirectTo: '/leagues' }
  ];    