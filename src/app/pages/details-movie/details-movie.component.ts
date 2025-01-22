import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-movie.component.html',
  styleUrls: ['./details-movie.component.css'],
})
export class DetailsMovieComponent implements OnInit {
  movie: any | null = null; // Para almacenar los datos de la película
  error: string | null = null; // Para manejar errores

  constructor(
    private route: ActivatedRoute, // Para acceder al ID desde la URL
    private movieService: MovieService // Para consumir el servicio
  ) { }

  ngOnInit(): void {
    this.loadMovie();
  }

  // Método para cargar la película
  loadMovie(): void {
    const movieId = this.route.snapshot.paramMap.get('id'); // Obtener ID de la URL
    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (data) => {
          this.movie = data; // Asignar los datos al objeto `movie`
        },
        error: (err) => {
          this.error = 'Error al cargar los detalles de la película';
          console.error(err);
        },
      });
    } else {
      this.error = 'No se proporcionó un ID válido';
    }
  }
}
