import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      firstName: [''],
      lastName: '',
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      roleId: [2],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        this.router.navigateByUrl('/authentication/signin');
      },
      (error) => {
        console.log('register failed');
      }
    );
  }
}
