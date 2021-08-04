import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  {
    path: 'find',
    component: AllBooksComponent,
  },
  {
    path: 'authors',
    component: AuthorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
