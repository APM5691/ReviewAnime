import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isTokenValid()) {
      // Asume que tienes un método isTokenValid en AuthService
      this.router.navigate(['login']); // Redirige al usuario a la página de inicio de sesión
      return false;
    }
    return true;
  }
}
