import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { catchError, map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token') ?? 'Error';

  if (token === 'Error') {
    return false;
  }

  return true;
};
