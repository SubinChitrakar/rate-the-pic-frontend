import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommentModel} from '../model/commentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  _url = 'http://localhost:8848/comment/';

  constructor(private _http: HttpClient) { }

  addComment(comment: CommentModel){
    const newUrl = this._url  + 'addComment';
    return this._http.post<any>(newUrl, comment);
  }

  getComment(userId){
    const newUrl = this._url  + userId;
    return this._http.get<any>(newUrl);
  }

  getAllComment(imageId){
    const newUrl = this._url  + 'getComment/' + imageId;
    return this._http.get<any>(newUrl);
  }

}
