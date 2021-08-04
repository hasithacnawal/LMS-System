import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { Book } from 'src/app/core/models/book';
import { BooksService } from 'src/app/core/service/books.service';
import { Journal } from 'src/app/core/models/journal';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  doctorsForm: FormGroup;
  books: Journal;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BooksService,
    private fb: FormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.book.title;
      this.books = data.book;
    } else {
      this.dialogTitle = 'New Book';
      this.books = new Journal();
    }
    this.doctorsForm = this.createContactForm();
  }
  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.books.id],
      img: [this.books.img],
      title: [this.books.title],
      description: [this.books.description],
      // date: [
      //   formatDate(this.doctors.date, 'yyyy-MM-dd', 'en'),
      //   [Validators.required]
      // ],
      type: [this.books.type],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.bookService.saveBook(this.doctorsForm.getRawValue());
  }
}
