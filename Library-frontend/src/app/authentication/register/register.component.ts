import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  submitted = false;
  returnUrl: string;
  hide = true;
  chide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    this.registerPayload = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  ngOnInit(): void {}

  onSubmit() {
    this.registerPayload.firstName = this.registerForm.get('firstName').value;
    this.registerPayload.lastName = this.registerForm.get('lastName').value;
    this.registerPayload.userName = this.registerForm.get('userName').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword =
      this.registerForm.get('confirmPassword').value;

    this.submitted = true;
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
