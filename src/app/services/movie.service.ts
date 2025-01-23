import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly API_URL = environment.API_URL;
  private readonly API_KEY = environment.API_KEY;

  constructor(private http: HttpClient) { }

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

  //  Método para obtener las mejores calificadas
  getTopRatedMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/top_rated`, {
      params: {
        api_key: this.API_KEY,
      },
    });
  }
}
