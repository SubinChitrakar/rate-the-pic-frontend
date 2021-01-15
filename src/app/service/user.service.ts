import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = 'http://localhost:8848/user';

  constructor(private _http: HttpClient) { }

  login(user: User){
    const newUrl = this._url  + '/login';
    return this._http.post<any>(newUrl, user);
  }

  register(user: User){
    const newUrl = this._url + '/register';
    return this._http.post<any>(newUrl, user);
  }
}
