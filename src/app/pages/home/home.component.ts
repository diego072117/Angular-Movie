import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Cambié "styleUrl" a "styleUrls"
})
export class HomeComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getAllMovies();
  }

  // Llamar al servicio para obtener todas las películas
  getAllMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        console.log('Películas:', data.results); // Mostrar películas en la consola
      },
      error: (err) => {
        console.error('Error al obtener películas:', err);
      },
    });
  }
}
