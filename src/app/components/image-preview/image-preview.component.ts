import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ImageModel} from '../../model/imageModel';
import {CommentService} from '../../service/comment.service';
import {CommentModel} from '../../model/commentModel';
import {ImageService} from '../../service/image.service';
import {MessageDialogComponent, MessageDialogModel} from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  imageModel: ImageModel;
  averageRating: number;
  averageBarValue: number;
  commentInfo: CommentModel[];

  constructor(public dialogRef: MatDialogRef<ImagePreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ImagePreviewModel, public commentService: CommentService, public imageService: ImageService, public messageDialog: MatDialog) {
    this.imageModel = new ImageModel();
    this.averageRating = 0;
    this.averageBarValue = 0;
    this.commentInfo = [];
    this.imageModel = data.imageDetails;
    this.getComment(this.imageModel.id);
  }

  getComment(imageId): void {
    this.commentService.getAllComment(imageId)
      .subscribe(
        response => this.displayDetails(response),
        error => console.log('Error', error)
      );
  }

  displayDetails(response): void {
    this.averageRating = response.average * 1;
    this.averageBarValue = this.averageRating * 10;
    response.data.forEach(commentDetails => {
      const comment = new CommentModel();
      comment.commentDetails = commentDetails.comment;
      comment.commentDate = commentDetails.comment_date;
      comment.userEmail = commentDetails.email;
      comment.rating = commentDetails.rating;
      this.commentInfo.push(comment);
    });
  }

  deleteImage(): void {
    this.imageService.deleteImage(this.imageModel.id)
      .subscribe(
        response => this.openDialog(response),
        error => console.log('Error', error)
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialog(response): void {
    const dialogData = new MessageDialogModel(response.message, '', false);

    const dialogRef = this.messageDialog.open(MessageDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
      window.location.reload();
    });
  }
}

export class ImagePreviewModel {
  constructor(public imageDetails: ImageModel) {
  }
}
