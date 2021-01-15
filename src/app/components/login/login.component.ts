import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  matcher: MyErrorStateMatcher;

  ngOnInit(): void {
    this.user = new User('', '', '');
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.matcher = new MyErrorStateMatcher();
  }

}
