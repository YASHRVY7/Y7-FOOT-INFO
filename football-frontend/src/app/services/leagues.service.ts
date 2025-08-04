import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaguesService {
  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getLeagues():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/leagues`).pipe(
      map((data:any)=>Array.isArray(data)?data:(data.leagues||data))
    );
  }
}
