import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.css'],
})
export class CardMovieComponent {
  @Input() movie: any; // Recibir los datos de la película desde el padre
}
