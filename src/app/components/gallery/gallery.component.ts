import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../service/image.service';
import {ImageModel} from '../../model/imageModel';
import {MatDialog} from '@angular/material/dialog';
import {ImagePreviewComponent, ImagePreviewModel} from '../image-preview/image-preview.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: ImageModel[];

  constructor(private imageService: ImageService, public messageDialog: MatDialog) {
    this.images = [];
  }

  ngOnInit(): void {
    this.imageService.getAllImage()
      .subscribe(
        data => this.displayData(data),
        error => console.log('Error', error)
      );
  }

  displayData(data): void{
    data.imageList.forEach(image => {
      const imageData = new ImageModel();
      imageData.id = image.id;
      imageData.imagePath = image.image_path;
      imageData.imageName = image.image_name;
      imageData.uploadDate = image.upload_date;

      this.imageService.getImage(image.image_name).subscribe(url => imageData.imageUrl = url);
      this.images.push(imageData);
    });
  }

  openDialog(imageFile: ImageModel): void{
    window.event.preventDefault();
    const dialogData = new ImagePreviewModel(imageFile);

    const dialogRef = this.messageDialog.open(ImagePreviewComponent, {
      width: '1200px',
      data: dialogData
    });
  }
}
