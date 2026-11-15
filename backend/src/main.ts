import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir solicitudes desde el Frontend de Angular
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Backend NestJS escuchando en: http://localhost:${PORT}`);
}
bootstrap();

