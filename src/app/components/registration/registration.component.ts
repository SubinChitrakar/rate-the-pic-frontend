import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserModel} from '../../model/userModel';
import {MyErrorStateMatcher} from '../../app.component';
import {UserService} from '../../service/user.service';
import {EncryptService} from '../../service/encrypt.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent, MessageDialogModel} from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
  user: UserModel;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  passwordConfirmFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  constructor(private _registrationService: UserService, private _encryptService: EncryptService, public messageDialog: MatDialog){
  }

  ngOnInit(): void {
    this.user = new UserModel('', '', '');
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\\s).{8,20}$')]);
    this.passwordConfirmFormControl = new FormControl('', [Validators.required]);
    this.matcher = new MyErrorStateMatcher();
  }

  onSubmit(): void{
    const newUser = new UserModel(this.user.email, this._encryptService.encryptPassword('digital123.!!!', this.user.password), '');
    this._registrationService.register(newUser)
      .subscribe(
        data => {
          if (data.message === 'Existing UserModel'){
            this.openDialog(data.message, 'A user for this email has already been created.', true);
            this.user.password = null;
            this.user.confirmPassword = null;
          }
          else{
            this.openDialog(data.message, 'Please try to login using the credentials you have provided us', false);
          }
        },
        error => console.log('Error!', error));
  }

  openDialog(title: string, displayMessage: string, errorStatus: boolean): void{
    const dialogData = new MessageDialogModel(title, displayMessage, errorStatus);

    const dialogRef = this.messageDialog.open(MessageDialogComponent, {
      width: '600px',
      data: dialogData
    });

    if (!errorStatus){
      dialogRef.afterClosed().subscribe(result => {
        window.location.reload();
      });
    }
  }

}
