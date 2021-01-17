import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean{
    if (!this.auth.isAdmin()) {
      this.router.navigate(['404']);
      return false;
    }
    return true;
  }
}
