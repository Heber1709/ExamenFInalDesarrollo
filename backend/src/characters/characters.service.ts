import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CharactersService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';

  // Datos de respaldo para pruebas sin internet
  private readonly fallbackCharacters: Record<string, any> = {
    '1': {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Tierra (C-137)' },
      location: { name: 'Ciudadela de los Ricks' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
    '2': {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'desconocido' },
      location: { name: 'Ciudadela de los Ricks' },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    },
  };

  async findOne(id: string) {
    try {
      console.log(`📡 [GET /characters/${id}] Consultando personaje...`);
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        throw new Error(`Personaje ${id} no encontrado en la API externa`);
      }

      const data = await response.json();
      console.log(`✅ [GET /characters/${id}] Personaje encontrado: ${data.name}`);
      return data;
    } catch (error) {
      console.warn(`⚠️ [GET /characters/${id}] Error en la API externa. Buscando en respaldo...`, error.message);
      const fallback = this.fallbackCharacters[id];
      if (fallback) return fallback;

      throw new HttpException(`Personaje con id ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
  }
}
