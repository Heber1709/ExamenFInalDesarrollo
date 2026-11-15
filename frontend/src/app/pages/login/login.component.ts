import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = 'admin';
  password = '123';
  errorMessage = '';
  loading = false;

  onSubmit() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor ingresa usuario y contraseña';
      return;
    }

    this.loading = true;

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Usa: admin / 1234';
        } else {
          this.errorMessage = 'No se pudo conectar con el servidor NestJS (puerto 3000). Asegúrate de que esté iniciado.';
        }
      },
    });
  }
}

