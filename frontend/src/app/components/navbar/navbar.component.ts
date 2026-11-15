import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="barra-navegacion">
      <div class="lado-izquierdo">
        <a routerLink="/home" class="logo">RICKFLIX</a>
        <span class="subtexto-logo">Examen Final</span>
      </div>

      <div class="lado-derecho" *ngIf="authService.isLoggedIn()">
        <span class="usuario-activo" *ngIf="usuario">
          👤 {{ usuario.username }}
        </span>
        <button class="btn-cerrar-sesion" (click)="cerrarSesion()">
          Cerrar Sesión
        </button>
      </div>
    </header>
  `,
  styles: [`
    .barra-navegacion {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 30px;
      background-color: #0c0c0c;
      border-bottom: 1px solid #222222;
    }

    .lado-izquierdo {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .logo {
      color: #E50914;
      font-size: 26px;
      font-weight: 900;
      text-decoration: none;
      letter-spacing: 1px;
    }

    .subtexto-logo {
      color: #666666;
      font-size: 13px;
      border-left: 1px solid #333333;
      padding-left: 12px;
    }

    .lado-derecho {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .usuario-activo {
      font-size: 14px;
      color: #cccccc;
    }

    .btn-cerrar-sesion {
      background-color: transparent;
      color: #ffffff;
      border: 1px solid #555555;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }

    .btn-cerrar-sesion:hover {
      background-color: #E50914;
      border-color: #E50914;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  get usuario() {
    return this.authService.getCurrentUser();
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
