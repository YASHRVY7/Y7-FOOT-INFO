import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlayersService {
private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }


  getPlayers(teamId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/players/${teamId}`).pipe(
      map((data: any) => Array.isArray(data) ? data : (data.players || data))
    );
  }
}
