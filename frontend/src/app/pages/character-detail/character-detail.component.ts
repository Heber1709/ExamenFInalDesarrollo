import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Character } from '../../models/character.model';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private location = inject(Location);

  personaje: Character | null = null;
  cargando = true;
  mensajeError = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarPersonaje(id);
    }
  }

  cargarPersonaje(id: string): void {
    this.cargando = true;
    this.apiService.getCharacterById(id).subscribe({
      next: (data) => {
        this.personaje = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar personaje:', err);
        this.mensajeError = 'No se pudo cargar el personaje desde el Backend NestJS.';
        this.cargando = false;
      },
    });
  }

  volver(): void {
    this.location.back();
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
