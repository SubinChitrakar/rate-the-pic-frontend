import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  _url = 'http://localhost:8848/images/';

  constructor(private _http: HttpClient, private sanitizer: DomSanitizer) { }

  getAllImage(){
    return this._http.get(this._url);
  }

  uploadImage(imageInfo: any){
    const newUrl = this._url  + 'upload';
    return this._http.post<any>(newUrl, imageInfo);
  }

  getImageToComment(userId: string){
    const newUrl = this._url  + '/getImage/' + userId;
    return this._http.get(newUrl);
  }

  deleteImage(imageId){
    const newUrl = this._url  + '/deleteImage/' + imageId;
    return this._http.delete(newUrl);
  }

  getImage(imageName: string): Observable<SafeResourceUrl> {
    const newUrl = this._url + imageName;
    return this._http
      .get(newUrl, { responseType: 'blob' })
      .pipe(map(x => {
          const urlToBlob = window.URL.createObjectURL(x);
          return this.sanitizer.bypassSecurityTrustResourceUrl(urlToBlob);
        }),
      );
  }
}
