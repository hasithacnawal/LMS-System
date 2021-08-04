import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private baseUrl = 'http://localhost:8888/api/books';
  private fakeUrl = 'assets/data/books.json';
  constructor(private httpClient: HttpClient) {}
  isTblLoading = true;
  dataChange: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  public totalSubject = new Subject();
  public orderSubject = new Subject();
  orders = [];

  products = [
    {
      id: '0',
      name: 'Carrot',
      quantity: 2,
      price: 12,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '1',
      name: 'Apple',
      quantity: 10,
      price: 12,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '2',
      name: 'Vanilla',
      quantity: 12,
      price: 25,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
    {
      id: '3',
      name: 'Vanilla',
      quantity: 12,
      price: 25,
      url: 'https://www.sciencedaily.com/images/2008/07/080722102723_1_540x360.jpg',
    },
  ];

  get data(): Book[] {
    return this.dataChange.value;
  }
  sendTotal(totalVal) {
    this.totalSubject.next(totalVal);
  }
  getDialogData() {
    return this.dialogData;
  }

  saveBook(book: Book) {
    return this.httpClient.post(`${this.baseUrl}/`, book);
  }

  getAllBooks(): void {
    this.httpClient.get<Book[]>(`${this.baseUrl}/`).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  getDummy() {
    return this.httpClient.get<Book[]>(`${this.fakeUrl}`);
  }
  getFakeBooks() {
    this.httpClient.get<Book[]>(this.baseUrl).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  getBookById(bookId: number): void {
    this.httpClient.get(`${this.baseUrl}/${bookId}`);
  }
  updateBook(book: Book): void {
    this.dialogData = book;

    /* this.httpClient.put(this.API_URL + doctors.id, doctors).subscribe(data => {
      this.dialogData = doctors;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteBook(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
