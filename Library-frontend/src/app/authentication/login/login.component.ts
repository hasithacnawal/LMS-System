import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  submitted = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['admin1@gmail.com', Validators.required],
      password: ['1234', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('email').setValue('admin1@gmail.com');
    this.authForm.get('password').setValue('1234');
  }
  userSet() {
    this.authForm.get('email').setValue('user1@gmail.com');
    this.authForm.get('password').setValue('1234');
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.authForm.invalid) {
      this.error = 'email or Password not valid !';
      return;
    } else {
      this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (data) => {
            if (data) {
              const role = this.authService.currentUserValue.role.role;
              if (role === 'Admin') {
                this.router.navigate(['/admin']);
              } else if (role === 'User') {
                this.router.navigate(['/authUser']);
              } else {
                this.router.navigate(['/authentication/signin']);
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
          }
        );
    }
  }
}
