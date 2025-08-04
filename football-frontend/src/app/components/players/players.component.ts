import { Component } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-players',
  imports: [CommonModule,RouterLink],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent  {
    teamId!:string;
    team: any = null;  
    players:any[]=[];
    loading:boolean=false;
    error:string|null=null;
    constructor(private playersService:PlayersService,
      private route:ActivatedRoute,
      private router:Router
    ){
      const navigation=this.router.getCurrentNavigation();
      if(navigation?.extras.state){
        this.team=navigation?.extras.state['team'];
      }
    }

    ngOnInit() {
      this.route.paramMap.subscribe((params) => { 
        const id = params.get('teamId');
        if (id) {
          this.teamId = id;
          this.fetchPlayers();
        } 
      });
    }
    fetchPlayers() {
      this.loading = true;
      this.error = null;
      this.playersService.getPlayers(this.teamId).subscribe({
        next: (data: any[]) => {
          this.players = data;
          this.loading = false;
        },
        error: (err: any) => {
          this.error = err?.error?.message || 'Failed to load players.';
          this.loading = false;
        }
      });
    }

    calculateAge(dateOfBirth: string): number {
      if (!dateOfBirth) return 0;
      
      const birthDate = new Date(dateOfBirth);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    }

    getPositionClass(position: string | null): string {
      if (!position) return 'default';
      
      const positionLower = position.toLowerCase();
      
      if (positionLower.includes('goalkeeper')) return 'goalkeeper';
      if (positionLower.includes('defender') || positionLower.includes('back')) return 'defender';
      if (positionLower.includes('midfielder') || positionLower.includes('midfield')) return 'midfielder';
      if (positionLower.includes('forward') || positionLower.includes('striker') || positionLower.includes('winger')) return 'forward';
      if (positionLower.includes('attack')) return 'attacker';
      
      return 'default';
    }
}
