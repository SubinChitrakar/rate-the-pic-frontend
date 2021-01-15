import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  title: string;
  message: string;
  errorStatus: boolean;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MessageDialogModel) {
    this.title = data.title;
    this.message = data.message;
    this.errorStatus = data.messageStatus;
  }
}

export class MessageDialogModel {
  constructor(public title: string, public message: string, public messageStatus: boolean) {
  }
}
