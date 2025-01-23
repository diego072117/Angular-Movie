import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardMovieComponent } from '../../components/card-movie/card-movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardMovieComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  moviesPopular: any[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllMovies();
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
}
