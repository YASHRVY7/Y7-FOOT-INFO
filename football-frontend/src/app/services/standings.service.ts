import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StandingsService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getStandings(competitionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/standings/${competitionId}`);
  }
}
