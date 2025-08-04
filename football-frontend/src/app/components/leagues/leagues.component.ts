import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../../services/leagues.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-leagues',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css']
})
export class LeaguesComponent implements OnInit{
    leagues:any[]=[];
    loading:boolean=false;
    error:string|null=null;
    searchTerm:string='';

    constructor(private leaguesService:LeaguesService){}

    ngOnInit():void{
      this.loading=true;
      this.leaguesService.getLeagues().subscribe({
        next:data=>{
          this.leagues=data;
          this.loading=false;
        },
        error: err => {
          console.error('API error:', err);
          this.error = err?.error?.message || JSON.stringify(err) || 'Failed to load leagues.';
          this.loading = false;
        }
      })
    }

    get filteredLeagues():any[]{
      if(!this.searchTerm.trim()) return this.leagues;
      const search=this.searchTerm.trim().toLowerCase();
      return this.leagues.filter((league:any)=>{
        return league.name.toLowerCase().includes(search);
      })
    }



}
