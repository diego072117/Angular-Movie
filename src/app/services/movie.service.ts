import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_URL = 'https://api.themoviedb.org/3';
  private readonly API_KEY = '868b144a779bb1915b86394873616bad'; // API Key fija

  constructor(private http: HttpClient) {}

  // Método para obtener todas las películas
  getAllMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/discover/movie`, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }

  // Método para obtener una película por ID
  getMovieById(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${id}`, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }

  // Método para buscar películas por una palabra clave
  searchMovies(searchKey: string): Observable<any> {
    return this.http.get(`${this.API_URL}/search/movie`, {
      params: {
        api_key: this.API_KEY,
        query: searchKey,
      },
    });
  }

  // Método para obtener los videos de una película
  getMovieVideos(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${id}/videos`, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }
}
