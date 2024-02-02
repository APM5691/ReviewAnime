import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token') ?? false;

  const isTokenExpired =
    typeof token === 'string' &&
    JwtHelperService.prototype.isTokenExpired(token);

  console.log('isTokenExpired', isTokenExpired);

  if (isTokenExpired) {
    return false;
  }

  return true;
};
