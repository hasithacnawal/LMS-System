import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { AllBooksComponent } from './all-books/all-books.component';

const routes: Routes = [
  {
    path: 'addBooks',
    component: AddBooksComponent,
  },
  {
    path: 'allBooks',
    component: AllBooksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
