import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginPayload } from '../login-payload';
import { AuthService } from 'src/app/core/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  loginPayload: LoginPayload;
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
      userName: ['admin1', Validators.required],
      password: ['1234', Validators.required],
    });
  }

  adminSet() {
    this.authForm.get('userName').setValue('admin1');
    this.authForm.get('password').setValue('1234');
  }
  userSet() {
    this.authForm.get('userName').setValue('user1');
    this.authForm.get('password').setValue('1234');
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.loginPayload = this.authForm.value;

    if (this.authForm.invalid) {
      this.error = 'email or Password not valid !';
      return;
    } else {
      this.authService.login(this.loginPayload).subscribe(
        (data) => {
          if (data) {
            const role = this.authService.currentUserValue.role.role;
            if (role === 'Admin') {
              this.router.navigate(['/admin']);
            } else if (role === 'User') {
              this.router.navigate(['/authUser/home']);
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
