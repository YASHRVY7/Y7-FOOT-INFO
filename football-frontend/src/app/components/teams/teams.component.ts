import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../services/teams.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LeaguesService } from '../../services/leagues.service';


@Component({
  selector: 'app-teams',
  imports: [CommonModule,RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit {
  leagueCode!: string;
  teams: any[] = [];
  league:any;
  loading = false;
  error: string | null = null;


  constructor(private teamsService:TeamsService,private route:ActivatedRoute,private leaguesService:LeaguesService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const code=params.get('leagueId');
      if(code){
        this.leagueCode=code;
        this.fetchTeams();
        this.fetchLeague();
      }
    })

  }
  fetchTeams(){
    this.loading=true;
    this.error=null;
    this.teamsService.getTeams(this.leagueCode).subscribe({
      next:data=>{
        this.teams=data;
        this.loading=false;
      },
      error:err=>{
        this.error=err?.error?.message||'Failed to load teams.';
        this.loading=false;
      }
    })
  }
  fetchLeague(){
    this.leaguesService.getLeagues().subscribe({
      next:data=>{
        this.league=data.find((league:any)=>league.code===this.leagueCode);
      }
    })
  }
} 
