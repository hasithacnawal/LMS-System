import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BooksService } from 'src/app/core/service/books.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class AllJournalDelete {
  constructor(
    public dialogRef: MatDialogRef<AllJournalDelete>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BooksService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.bookService.deleteBook(this.data.id);
  }
}
