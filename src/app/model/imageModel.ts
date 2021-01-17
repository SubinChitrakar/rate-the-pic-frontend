import {SafeResourceUrl} from '@angular/platform-browser';

export class ImageModel{
  id: number;
  imageName: string;
  imagePath: string;
  uploadDate: Date;
  imageUrl: SafeResourceUrl;
}
