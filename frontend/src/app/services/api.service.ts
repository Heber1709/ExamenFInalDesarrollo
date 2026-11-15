import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, EpisodesApiResponse } from '../models/episode.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener catálogo de episodios desde el backend NestJS (GET /episodes)
  getEpisodes(): Observable<EpisodesApiResponse> {
    return this.http.get<EpisodesApiResponse>(`${this.baseUrl}/episodes`);
  }

  // Obtener detalle de un episodio por ID (GET /episodes/:id)
  getEpisodeById(id: string | number): Observable<Episode> {
    return this.http.get<Episode>(`${this.baseUrl}/episodes/${id}`);
  }

  // Obtener detalle de un personaje por ID (GET /characters/:id)
  getCharacterById(id: string | number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/characters/${id}`);
  }
}

