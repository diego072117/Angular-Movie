import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { CardMovieComponent } from '../../components/card-movie/card-movie.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  private searchSubject: Subject<string> = new Subject(); // Subject para manejar cambios en el input

  constructor(private movieService: MovieService) {
    // Configurar el Subject para manejar la búsqueda con debounce
    this.searchSubject
      .pipe(
        debounceTime(500), // Espera 500ms después de que el usuario deje de escribir
        distinctUntilChanged() // Evita búsquedas duplicadas si no hay cambios
      )
      .subscribe({
        next: (searchTerm) => this.performSearch(searchTerm),
        error: (err) => console.error('Error al procesar la búsqueda:', err),
      });
  }

  // Manejar cambios en el input
  onSearchInputChange(): void {
    this.searchSubject.next(this.searchKeyword.trim()); // Emitir el valor del input al Subject
  }

  // Realizar la búsqueda
  private performSearch(searchTerm: string): void {
    if (!searchTerm) {
      this.movies = [];
      this.error = null;
      return;
    }

    this.movieService.searchMovies(searchTerm).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.error = this.movies.length ? null : 'No se encontraron resultados.';
      },
      error: (err) => {
        console.error('Error al buscar películas:', err);
        this.error = 'Ocurrió un error al buscar películas.';
      },
    });
  }
}
