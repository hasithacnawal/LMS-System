import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { BooksService } from 'src/app/core/service/books.service';
import { CategoryService } from 'src/app/core/service/category.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.css'],
})
export class AddBooksComponent {
  form: FormGroup;
  categories: Observable<Category[]>;
  hide3 = true;

  agree3 = false;
  copies: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      img: [''],
      author: [''],
      year: ['', Validators.minLength(4)],
      description: [''],
      authorId: [1],
      categoryId: [18],
      stockCount: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    console.log(this.categories);
  }

  saveBook() {
    this.booksService.saveBook(this.form.value).subscribe(
      (data) => {
        this.showNotification(
          'green',
          'Book is Recorded Successfully...!!!',
          'bottom',
          'center'
        );
      },
      (error) => console.log(error)
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  onSubmit() {
    this.saveBook();

    this.router.navigateByUrl('/admin/books/allBooks');
  }
}
