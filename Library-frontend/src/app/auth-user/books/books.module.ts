import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from 'src/app/core/service/books.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { AllBooksComponent } from './all-books/all-books.component';
import { FormDialogComponent } from './all-books/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './all-books/dialogs/delete/delete.component';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  declarations: [
    AllBooksComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AuthorsComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BooksService, AuthService],
})
export class BooksModule {}
