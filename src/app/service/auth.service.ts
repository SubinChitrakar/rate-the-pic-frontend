import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public isAuthenticated(): boolean{
    const user = sessionStorage.getItem('user');
    return user != null;
  }

  public isAdmin(): boolean{
    const adminStatus = sessionStorage.getItem('admin');
    return (adminStatus === 'true');
  }
}
