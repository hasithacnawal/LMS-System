import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { AuthService } from 'src/app/core/service/auth.service';
import { CategoryService } from 'src/app/core/service/category.service';
import { JournalService } from 'src/app/core/service/journal.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.sass'],
})
export class PublishComponent implements OnInit {
  form: FormGroup;
  categories: Observable<Category[]>;
  hide3 = true;

  agree3 = false;
  copies: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private fb: FormBuilder,
    private journalService: JournalService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      img: ['assets/images/journal/journal1.JPEG'],
      type: [''],
      file: ['demo.pdf'],
      description: [''],
      createrId: [authService.currentUserValue.id],
    });
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    console.log(this.categories);
  }

  saveJournal() {
    this.journalService.saveJournal(this.form.value).subscribe(
      (data) => {
        this.showNotification(
          'success-green',
          'Journal is published Successfully...!!!',
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
    this.saveJournal();
    this.router.navigateByUrl('authUser/journals/my');
  }
}
