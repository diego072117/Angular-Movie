import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsMovieComponent } from './pages/details-movie/details-movie.component';
import { SearchMovieComponent } from './pages/search-movie/search-movie.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movie/:id', component: DetailsMovieComponent },
    { path: 'search', component: SearchMovieComponent },
];
