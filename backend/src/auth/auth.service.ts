import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(body: { username?: string; password?: string }) {
    const { username, password } = body;

    // Validación simple de credenciales de prueba
    if (!username || !password) {
      throw new UnauthorizedException('Usuario y contraseña son requeridos');
    }

    // Acepta usuario 'admin' con password '1234' o cualquier usuario con contraseña >= 4 caracteres
    if ((username === 'admin' && password === '1234') || password.length >= 4) {
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        token: 'fake-jwt-token-rickflix-xyz123',
        user: {
          username: username,
          role: 'subscriber',
        },
      };
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}

