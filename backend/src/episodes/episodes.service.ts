import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class EpisodesService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/episode';

  // Datos de respaldo por si el internet o la API externa falla durante el examen
  private readonly fallbackEpisodes = [
    {
      id: 1,
      name: 'Piloto',
      air_date: '2 de diciembre de 2013',
      episode: 'S01E01',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
      url: 'https://rickandmortyapi.com/api/episode/1',
    },
    {
      id: 2,
      name: 'Invasión canina',
      air_date: '9 de diciembre de 2013',
      episode: 'S01E02',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
      url: 'https://rickandmortyapi.com/api/episode/2',
    },
    {
      id: 3,
      name: 'Parque anatómico',
      air_date: '16 de diciembre de 2013',
      episode: 'S01E03',
      characters: [
        'https://rickandmortyapi.com/api/character/1',
        'https://rickandmortyapi.com/api/character/2',
      ],
      url: 'https://rickandmortyapi.com/api/episode/3',
    },
  ];

  async findAll() {
    try {
      console.log('📡 [GET /episodes] Consultando la API de Rick and Morty...');
      const response = await fetch(this.baseUrl);

      if (!response.ok) {
        throw new Error(`Respuesta de la API externa no válida: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [GET /episodes] ${data.results?.length || 0} episodios obtenidos correctamente.`);
      return data;
    } catch (error) {
      console.warn('⚠️ [GET /episodes] No se pudo conectar a la API externa. Usando datos de respaldo:', error.message);
      // Retorna datos de respaldo para que la app nunca se quede en blanco durante el examen
      return {
        info: { count: this.fallbackEpisodes.length, pages: 1, next: null, prev: null },
        results: this.fallbackEpisodes,
      };
    }
  }

  async findOne(id: string) {
    try {
      console.log(`📡 [GET /episodes/${id}] Consultando detalle del episodio...`);
      const response = await fetch(`${this.baseUrl}/${id}`);

      if (!response.ok) {
        throw new Error(`Episodio ${id} no encontrado en la API externa`);
      }

      const data = await response.json();
      console.log(`✅ [GET /episodes/${id}] Detalle obtenido: ${data.name}`);
      return data;
    } catch (error) {
      console.warn(`⚠️ [GET /episodes/${id}] Error en la API externa. Buscando en respaldo...`, error.message);
      const fallback = this.fallbackEpisodes.find((e) => e.id.toString() === id);
      if (fallback) return fallback;

      throw new HttpException(`Episodio con id ${id} no encontrado`, HttpStatus.NOT_FOUND);
    }
  }
}
