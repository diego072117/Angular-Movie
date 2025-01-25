import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { MovieService } from '../../services/movie.service';
import { CardMovieComponent } from '../../components/card-movie/card-movie.component';
import { MovieDetailModalComponent } from '../../components/movie-detail-modal/movie-detail-modal.component'; // Importa el modal
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
  private searchSubject: Subject<string> = new Subject();

  constructor(private movieService: MovieService, private dialog: MatDialog) { // Inyecta MatDialog
    this.searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe({
        next: (searchTerm) => this.performSearch(searchTerm),
        error: (err) => console.error('Error al procesar la búsqueda:', err),
      });
  }

  // Manejar cambios en el input
  onSearchInputChange(): void {
    this.searchSubject.next(this.searchKeyword.trim());
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

  // Abrir el modal con el tráiler
  openMovieModal(movie: any): void {
    this.dialog.open(MovieDetailModalComponent, {
      width: '850px',
      height: '600px',
      //disableClose: true, 
      maxWidth: 'none',
      data: movie, // Envía los datos al modal
    });
  }
}
