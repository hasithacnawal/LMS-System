import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Journal } from '../models/journal';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private baseUrl = 'http://localhost:8888/api/journal';
  private fakeUrl = 'assets/data/books.json';
  constructor(private httpClient: HttpClient) {}
  isTblLoading = true;
  dataChange: BehaviorSubject<Journal[]> = new BehaviorSubject<Journal[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  get data(): Journal[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  saveJournal(journal: Journal) {
    return this.httpClient.post(`${this.baseUrl}/`, journal);
  }

  getAllJournals(): void {
    this.httpClient.get<Journal[]>(`${this.baseUrl}/`).subscribe(
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
  getMyJournals(id: number): void {
    this.httpClient.get<Journal[]>(`${this.baseUrl}/myAll/${id}`).subscribe(
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
    return this.httpClient.get<Journal[]>(`${this.fakeUrl}`);
  }

  getJournalById(bookId: number): void {
    this.httpClient.get(`${this.baseUrl}/${bookId}`);
  }
  updateJournal(book: Journal): void {
    this.dialogData = book;

    /* this.httpClient.put(this.API_URL + doctors.id, doctors).subscribe(data => {
      this.dialogData = doctors;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteJournal(id: number): void {
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
