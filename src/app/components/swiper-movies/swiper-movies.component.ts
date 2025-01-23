import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-swiper-movies',
  standalone: true,
  imports: [CommonModule, CardMovieComponent],
  templateUrl: './swiper-movies.component.html',
  styleUrls: ['./swiper-movies.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperMoviesComponent {
  @Input() movies: any[] = []; // Lista de películas
}
