import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service'; // Asegúrate de tener configurado el servicio correctamente

@Component({
  selector: 'app-featured-movie',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './featured-movie.component.html',
  styleUrls: ['./featured-movie.component.css']
})
export class FeaturedMovieComponent implements OnInit, OnChanges {
  @Input() movies: any[] = []; 
  currentMovieIndex: number = 0; // Índice de la película actual
  currentMovie: any = null; // Película actual
  trailerUrl: string | null = null; // URL del trailer

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('Películas iniciales recibidas:', this.movies); // Verifica los datos recibidos
    if (this.movies.length > 0) {
      this.startMovieRotation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['movies'] && changes['movies'].currentValue.length > 0) {
      console.log('Películas actualizadas:', changes['movies'].currentValue);
      this.currentMovieIndex = 0; // Reinicia el índice
      this.startMovieRotation(); // Reinicia la rotación
    }
  }

  // Método para iniciar la rotación de películas
  startMovieRotation(): void {
    this.currentMovie = this.movies[this.currentMovieIndex];
    this.loadTrailer(this.currentMovie.id); // Cargar trailer para la primera película

    setInterval(() => {
      this.currentMovieIndex =
        (this.currentMovieIndex + 1) % this.movies.length; // Cambia al siguiente índice
      this.currentMovie = this.movies[this.currentMovieIndex];
      this.loadTrailer(this.currentMovie.id); // Cargar trailer para la nueva película
    }, 8000); // Cambia cada 8 segundos
  }

  // Método para cargar el trailer
  loadTrailer(movieId: string): void {
    this.movieService.getMovieVideos(movieId).subscribe({
      next: (data) => {
        const trailer = data.results.find(
          (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        this.trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
      },
      error: (err) => {
        console.error('Error al cargar el trailer:', err);
        this.trailerUrl = null;
      },
    });
  }
}
