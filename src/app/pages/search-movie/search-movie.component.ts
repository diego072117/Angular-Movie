import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MovieService } from '../../services/movie.service';
import { CardMovieComponent } from '../../components/card-movie/card-movie.component';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, CardMovieComponent], 
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent {
  searchKeyword: string = ''; 
  movies: any[] = []; 
  error: string | null = null; 

  constructor(private movieService: MovieService) {}

  // Método para buscar películas por palabra clave
  searchMovies(): void {
    if (this.searchKeyword.trim() === '') {
      this.error = 'Por favor ingresa una palabra clave.';
      return;
    }

    this.error = null; // Resetear el error
    this.movieService.searchMovies(this.searchKeyword).subscribe({
      next: (data) => {
        this.movies = data.results; 
      },
      error: (err) => {
        console.error('Error al buscar películas:', err);
        this.error = 'Ocurrió un error al buscar películas.';
      },
    });
  }
}
