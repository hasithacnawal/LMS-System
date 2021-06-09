import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/core/service/books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent implements OnInit {
  form: FormGroup;
  hide3 = true;
  agree3 = false;
  copies: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      year: ['', Validators.minLength(4)],
      no_of_copies: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  saveBook() {
    this.booksService.saveBook(this.form.value).subscribe(
      (data) => {
        this.showNotification(
          'black',
          'Add Organization Record Successfully...!!!',
          'bottom',
          'center'
        );
      },
      (error) => console.log(error)
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    console.log('Form Value', this.form.value);
  }
}
