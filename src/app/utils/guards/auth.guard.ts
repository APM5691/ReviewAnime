import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.loginService.getToken();

    // Verificar si el token ha expirado
    const isTokenExpired =
      typeof token === 'string' && this.jwtHelper.isTokenExpired(token);

    console.log('isTokenExpired', isTokenExpired);

    if (isTokenExpired) {
      this.loginService.removeToken();
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
