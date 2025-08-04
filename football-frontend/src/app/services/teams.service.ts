import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getTeams(competitionId:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/teams/${competitionId}`).pipe(
      map((data: any) => Array.isArray(data) ? data : (data.teams || data))
    );
  }
  
}
