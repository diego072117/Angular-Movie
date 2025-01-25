import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { CardMovieComponent } from '../card-movie/card-movie.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieDetailModalComponent } from '../movie-detail-modal/movie-detail-modal.component'; // Importa MovieDetailModalComponent

@Component({
  selector: 'app-swiper-movies',
  standalone: true,
  imports: [CommonModule, CardMovieComponent, MatDialogModule],
  templateUrl: './swiper-movies.component.html',
  styleUrls: ['./swiper-movies.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperMoviesComponent {
  @Input() movies: any[] = []; // Lista de películas

  breakpoints = {
    1024: { slidesPerView: 8, slidesPerGroup: 5 },
    768: { slidesPerView: 4, slidesPerGroup: 2 },
    640: { slidesPerView: 2, slidesPerGroup: 1 },
  };

  constructor(private dialog: MatDialog) { } // Inyecta MatDialog

  openMovieDetails(movie: any) {
    this.dialog.open(MovieDetailModalComponent, {
      width: '850px', 
      height: '600px',
      //disableClose: true, 
      maxWidth: 'none', // Deshabilita la restricción de ancho máximo predeterminado
      panelClass: 'custom-modal-class', // Aplica una clase personalizada
      data: movie, 
    });
  }
}
