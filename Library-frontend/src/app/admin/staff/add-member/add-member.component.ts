import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.sass'],
})
export class AddMemberComponent implements OnInit {
  userForm: FormGroup;
  hide3 = true;
  agree3 = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,

    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['1234', [Validators.required]],
      phone: [''],
      roleId: [1],
    });
  }

  ngOnInit(): void {}

  saveUser() {
    this.authService.createUser(this.userForm.value).subscribe(
      (data) => {
        console.log(data);

        this.showNotification(
          'black',
          'Record Added Successfully...!!!',
          'bottom',
          'center'
        );
      },
      (error) => console.log(error)
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    console.log('Form Value', this.userForm.value);
    this.saveUser();
  }
}
