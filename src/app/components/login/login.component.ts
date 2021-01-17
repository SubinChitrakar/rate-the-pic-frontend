import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../model/userModel';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';
import {UserService} from '../../service/user.service';
import {EncryptService} from '../../service/encrypt.service';
import {MessageDialogComponent, MessageDialogModel} from '../message-dialog/message-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  user: UserModel;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  constructor(private _loginService: UserService, private _encryptService: EncryptService, public messageDialog: MatDialog, private router: Router){
  }

  ngOnInit(): void {
    this.user = new UserModel('', '', '');
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.matcher = new MyErrorStateMatcher();
  }

  onSubmit(): void{
    const newUser = new UserModel(this.user.email, this._encryptService.encryptPassword('digital123.!!!', this.user.password), '');
    this._loginService.login(newUser)
      .subscribe(
        response => {
          if (!response.data){
            this.openDialog('Incorrect Username / Password', 'Please try again with the correct credentials!', true);
            this.user.password = '';
          }
          else{
            sessionStorage.setItem('user', response.data.id);
            sessionStorage.setItem('admin', response.data.admin);

            if (response.data.admin){
              this.router.navigateByUrl('/admin-dashboard');
            }
            else{
              this.router.navigateByUrl('/dashboard/' + response.data.id);
            }
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
