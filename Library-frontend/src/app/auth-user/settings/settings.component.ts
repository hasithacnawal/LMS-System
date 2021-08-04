import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  public formAccount: FormGroup;
  public save: true;
  public submit: false;
  public admin: User;
  firstName: string;
  lastName: string;
  name: string;
  img: string;
  role: string;
  phone: string;

  admin$: Observable<User>;
  constructor(
    private adminService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private formBuilderAccount: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = new FormGroup({
      name: new FormControl(''),
    });
    (this.name =
      authService.currentUserValue.firstName +
      ' ' +
      authService.currentUserValue.lastName),
      (this.firstName = authService.currentUserValue.firstName),
      (this.lastName = authService.currentUserValue.lastName),
      (this.role = authService.currentUserValue.role.role),
      (this.img = authService.currentUserValue.img);
    this.phone = authService.currentUserValue.phone;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [this.authService.currentUserValue.email, Validators.required],
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
    });

    //console.log(this.admin,"admin");

    this.formAccount = this.formBuilderAccount.group({
      firstName: [this.firstName, Validators.required],
      lastName: [this.lastName, Validators.required],
      email: [this.authService.currentUserValue.email, Validators.required],
      phone: [this.authService.currentUserValue.phone, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  seeFormValue() {
    console.log(this.form.value);
  }
  onSubmit() {
    this.adminService
      .changePassword(
        this.authService.currentUserValue.id,
        this.f.oldPassword.value,
        this.f.password.value
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.showNotification(
            'Green',
            'Password Changed Successfully',
            'bottom',
            'center'
          );
        },
        (error) => {
          console.log(error);
          this.showNotification('Green', error, 'bottom', 'center');
        }
      );
  }

  onSave() {
    //console.log(this.authService.currentUserValue.id, this.formAccount.value);

    this.adminService
      .updateAdminAccount(
        this.authService.currentUserValue.id,
        this.formAccount.value
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.showNotification('Green', data, 'bootom', 'center');
          this.reset();
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

  reset() {
    this.adminService
      .getAdminById(this.authService.currentUserValue.id)
      .subscribe(
        (data) => {
          console.log('dfg', data);
          this.admin = data;
          console.log('admin', this.admin);
          this.formAccount = this.formBuilderAccount.group({
            name: [data.firstName, Validators.required],
            email: [data.email, Validators.required],
            phone: [data.phone, Validators.required],
          });
        },
        (error) => console.log(error)
      );
  }
}
