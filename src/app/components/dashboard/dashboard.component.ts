import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ImageModel} from '../../model/imageModel';
import {ImageService} from '../../service/image.service';
import {CommentModel} from '../../model/commentModel';
import {CommentService} from '../../service/comment.service';
import {MessageDialogComponent, MessageDialogModel} from '../message-dialog/message-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: string;
  imageModel: ImageModel;
  commentModel: CommentModel;
  commentsModel: CommentModel[];

  formatLabel(value: number) {
    return value;
  }

  sliderValue(event){
    this.commentModel.rating = event.value;
    document.getElementById('error-message').style.display = 'none';
    const ratingLabel = document.getElementById('rating-label');
    if (ratingLabel.classList.contains('text-danger')){
      ratingLabel.classList.remove('text-danger');
      ratingLabel.classList.add('float-left');
      ratingLabel.classList.add('rating-label');
    }
  }

  constructor(private router: Router, private imageService: ImageService, private commentService: CommentService,  public messageDialog: MatDialog) {
    this.userId = sessionStorage.getItem('user');
    this.imageModel = new ImageModel();
    this.commentModel = new CommentModel();
    this.commentsModel = [];
    this.commentModel.rating = 0;
  }

  ngOnInit(): void {
    this.imageService.getImageToComment(this.userId)
      .subscribe(
        response => this.setImageData(response),
        error => console.log('Error', error)
      );

    this.commentService.getComment(this.userId)
      .subscribe(
        response => this.setCommentData(response.data),
        error => console.log('Error', error)
      )
  }

  setImageData(response): void{
    const image = response.data;
    this.imageModel.id = image.id;
    this.imageModel.imagePath = image.image_path;
    this.imageModel.imageName = image.image_name;
    this.imageModel.uploadDate = image.upload_date;

    this.imageService.getImage(image.image_name).subscribe(url => this.imageModel.imageUrl = url);
  }

  setCommentData(commentsWithPicture): void{
    commentsWithPicture.forEach(comment => {
      const commentModel = new CommentModel();
      commentModel.id = comment.id;
      commentModel.rating = comment.rating;
      commentModel.commentDetails = comment.comment;
      commentModel.commentDate = comment.comment_date;

      commentModel.image = new ImageModel();
      commentModel.image.id = comment.imageDetails[0].id;
      this.imageService.getImage(comment.imageDetails[0].image_name).subscribe(url => commentModel.image.imageUrl = url);
      this.commentsModel.push(commentModel);
    });
  }

  onSubmit(formValue){
    if (this.commentModel.rating <= 0){
      document.getElementById('error-message').style.display = 'block';
      const ratingLabel = document.getElementById('rating-label');
      ratingLabel.className = 'text-danger';
    }
    else{
      this.commentModel.userId = parseInt(this.userId, 10);
      this.commentModel.imageId = this.imageModel.id;
      this.commentModel.commentDetails = formValue.comment;
      this.commentService.addComment(this.commentModel)
        .subscribe(
          data => this.displayMessage(data),
          error => console.log('Error', error)
        );
    }
  }

  displayMessage(data){
    if (data.message === 'Comment Added'){
      this.openDialog(data.message, 'Your comment and rating has successfully been added to today\'s post.', false);
    }
    else{
      this.openDialog(data.message, 'Please come back tomorrow to leave a comment and rating on the post.', true);
    }
  }

  openDialog(title: string, displayMessage: string, errorStatus: boolean): void{
    const dialogData = new MessageDialogModel(title, displayMessage, errorStatus);

    const dialogRef = this.messageDialog.open(MessageDialogComponent, {
      width: '400px',
      data: dialogData
    });

    if (!errorStatus){
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
      });
    }
  }

  removeOnClick(){
    window.event.preventDefault();
  }
}
