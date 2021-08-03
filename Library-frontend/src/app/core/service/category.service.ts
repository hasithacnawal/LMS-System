import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8888/api/category';

  constructor(private httpClient: HttpClient) {}
  isTblLoading = true;
  dataChange: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  get data(): Category[] {
    return this.dataChange.value;
  }
  saveCategory(category: Category) {
    return this.httpClient.post(`${this.baseUrl}/`, category);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.baseUrl}`);
  }
}
