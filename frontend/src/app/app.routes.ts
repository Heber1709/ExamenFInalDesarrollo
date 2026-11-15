import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EpisodeDetailComponent } from './pages/episode-detail/episode-detail.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'episode/:id',
    component: EpisodeDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'character/:id',
    component: CharacterDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

