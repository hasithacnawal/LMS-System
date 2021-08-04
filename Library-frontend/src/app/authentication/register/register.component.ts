import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { RegisterPayload } from '../register-payload';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  password: string;
  confirmPassword: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      roleId: [2],
    });
  }

  ngOnInit(): void {}
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  onSubmit() {
    this.submitted = true;
    this.password = this.registerForm.value.password;
    this.confirmPassword = this.registerForm.value.confirmPassword;
    if (this.password == this.confirmPassword) {
      this.authService.register(this.registerForm.value).subscribe(
        (data) => {
          this.router.navigateByUrl('/authentication/signin');
        },
        (error) => {
          console.log('register failed');
        }
      );
    } else {
      this.showNotification(
        'snackbar-danger',
        'Retype the confirm password',
        'bottom',
        'center'
      );
    }
  }
}
