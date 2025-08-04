import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StandingsService } from '../../services/standings.service';
import { LeaguesService } from '../../services/leagues.service';

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  competitionId!: string;
  standings: any[] = [];
  loading = false;
  error: string | null = null;
  league:any;
  constructor(private route: ActivatedRoute, private standingsService: StandingsService,private leaguesService:LeaguesService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const compId = params.get('competitionId');
      if (compId) {
        this.competitionId = compId;
        this.fetchStandings();
        this.fetchLeague();
      }
    });
  }

  fetchStandings(): void {
    this.loading = true;
    this.error = null;
    this.standings = [];

    this.standingsService.getStandings(this.competitionId).subscribe({
      next: data => {
        this.standings = data;
        this.loading = false;
      },
      error: err => {
        this.error = err?.error?.message || 'Failed to load standings.';
        this.loading = false;
      }
    });
  }
  fetchLeague(){
    this.leaguesService.getLeagues().subscribe({
      next:data=>{
        this.league=data.find((league:any)=>league.code===this.competitionId);
      }
    })
  }
}
