import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentModel} from '../model/commentModel';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  _url = 'http://localhost:8848/notification';

  constructor(private _http: HttpClient) { }

  addPushSubscription(subscription: any){
    return this._http.post<any>(this._url, subscription);
  }
}
