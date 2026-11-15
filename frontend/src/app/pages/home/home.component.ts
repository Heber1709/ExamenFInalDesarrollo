import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Episode } from '../../models/episode.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);

  episodes: Episode[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargarEpisodios();
  }

  cargarEpisodios(): void {
    this.loading = true;
    this.errorMessage = '';

    // Llama al Backend de NestJS en http://localhost:3000/episodes
    this.apiService.getEpisodes().subscribe({
      next: (data) => {
        this.episodes = data.results || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al conectar con NestJS:', err);
        this.errorMessage = 'No se pudo conectar con el Backend en NestJS (http://localhost:3000/episodes). Verifica que la terminal del backend esté iniciada.';
        this.loading = false;
      },
    });
  }
}
