import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { RegisterPayload } from '../register-payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.registerPayload = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    this.registerPayload.userName = this.registerForm.get('userName').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword =
      this.registerForm.get('confirmPassword').value;

    this.authService.register(this.registerPayload).subscribe(
      (data) => {
        console.log('/register succes');
        this.router.navigateByUrl('/register-success');
      },
      (error) => {
        console.log('register failed');
      }
    );
  }
}
