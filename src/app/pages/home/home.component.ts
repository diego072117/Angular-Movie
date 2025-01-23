import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperMoviesComponent } from '../../components/swiper-movies/swiper-movies.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SwiperMoviesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  moviesPopular: any[] = [];
  topRatedMovies: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
    this.getTopRatedMovies();
  }

  // Llamar al servicio para obtener todas las películas
  getAllMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.moviesPopular = data.results;
        console.log('Películas:', data.results);
      },
      error: (err) => {
        console.error('Error al obtener películas:', err);
      },
    });
  }

  // Llamar al servicio para obtener las mejores calificadas
  getTopRatedMovies(): void {
    this.movieService.getTopRatedMovies().subscribe({
      next: (data) => {
        this.topRatedMovies = data.results;
        console.log('Mejores calificadas:', data.results);
      },
      error: (err) => {
        console.error('Error al obtener las mejores calificadas:', err);
      },
    });
  }
}
