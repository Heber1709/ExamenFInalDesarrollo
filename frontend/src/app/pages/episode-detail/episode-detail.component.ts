import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Episode } from '../../models/episode.model';
import { Character } from '../../models/character.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
})
export class EpisodeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  episodio: Episode | null = null;
  personajes: Character[] = [];
  cargando = true;
  cargandoPersonajes = false;
  mensajeError = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDetalleEpisodio(id);
    }
  }

  cargarDetalleEpisodio(id: string): void {
    this.cargando = true;
    this.apiService.getEpisodeById(id).subscribe({
      next: (data) => {
        this.episodio = data;
        this.cargando = false;
        // Extraer los IDs de las URLs de los personajes
        this.obtenerPersonajes(data.characters);
      },
      error: (err) => {
        console.error('Error al cargar episodio:', err);
        this.mensajeError = 'No se pudo cargar el episodio desde el Backend NestJS.';
        this.cargando = false;
      },
    });
  }

  // Extrae el ID numérico de la URL (ejemplo: "https://rickandmortyapi.com/api/character/1" -> "1")
  obtenerPersonajes(urls: string[]): void {
    if (!urls || urls.length === 0) return;

    const ids = urls.map((url) => {
      const partes = url.split('/').filter(Boolean);
      return partes[partes.length - 1];
    });

    // Consultamos los primeros 12 personajes para una carga rápida y limpia
    const idsAConsultar = ids.slice(0, 12);
    this.cargandoPersonajes = true;

    const peticiones = idsAConsultar.map((id) =>
      this.apiService.getCharacterById(id).pipe(catchError(() => of(null)))
    );

    forkJoin(peticiones).subscribe({
      next: (resultados) => {
        this.personajes = resultados.filter((p): p is Character => p !== null);
        this.cargandoPersonajes = false;
      },
      error: () => {
        this.cargandoPersonajes = false;
      },
    });
  }

  traducirEstado(estado: string): string {
    const estados: Record<string, string> = {
      'Alive': 'Vivo',
      'Dead': 'Muerto',
      'unknown': 'Desconocido',
    };
    return estados[estado] || estado;
  }
}
