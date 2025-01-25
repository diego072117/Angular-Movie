import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SafeUrlPipe, RouterModule],
  templateUrl: './movie-detail-modal.component.html',
  styleUrls: ['./movie-detail-modal.component.css'],
})
export class MovieDetailModalComponent implements OnInit {
  trailerUrl: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: MovieService,
    private dialogRef: MatDialogRef<MovieDetailModalComponent> // Inyección de MatDialogRef
  ) { }

  ngOnInit(): void {
    this.loadTrailer();
  }

  private loadTrailer(): void {
    this.movieService.getMovieVideos(this.data.id).subscribe((response: any) => {
      const trailer = response.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      );
      if (trailer) {
        this.trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`;
      }
    });
  }

  closeModal(): void {
    this.dialogRef.close(); // Cierra el modal utilizando MatDialogRef
  }

}
