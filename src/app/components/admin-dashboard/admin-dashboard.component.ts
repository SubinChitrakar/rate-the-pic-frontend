import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../service/image.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MessageDialogComponent, MessageDialogModel} from '../message-dialog/message-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SwPush} from '@angular/service-worker';
import {NotificationService} from '../../service/notification.service';
import {subscribeTo} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  @ViewChild('UploadFileInput', {static: false}) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  readonly PUBLIC_VAPID_KEY = 'BDx28bcf7oDH_HId1bBMJxyvuxKjCCViF55i6MVDhVNFg8vCgQ0SbTaa-lQbrZTTXjiwo1S_VIqOJjD2FBkoQQE';

  constructor(private _uploadImageService: ImageService, private formBuilder: FormBuilder, public messageDialog: MatDialog, private swPush: SwPush, private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
    this.subscribeToNotification();
  }

  subscribeToNotification() {
    this.swPush.requestSubscription({
      serverPublicKey: this.PUBLIC_VAPID_KEY
    }).then(subscription => this.notificationService.addPushSubscription(subscription).subscribe())
      .catch(err => console.log('Could not subscribe!', err));
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value, this.fileInputLabel);

    this._uploadImageService.uploadImage(formData)
      .subscribe(response => {
          this.openDialog(response.message, '', false);
        },
        error => console.log('Error!', error));
  }

  openDialog(title: string, displayMessage: string, errorStatus: boolean): void {
    const dialogData = new MessageDialogModel(title, displayMessage, errorStatus);

    const dialogRef = this.messageDialog.open(MessageDialogComponent, {
      width: '400px',
      data: dialogData
    });

    if (!errorStatus) {
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
      });
    }
  }
}
