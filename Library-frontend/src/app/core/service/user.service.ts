import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8888/api/auth/';
  isTblLoading = true;
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {}
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  changePassword(id: number, oldPassword: string, password: string) {
    //console.log(id,oldPassword);

    return this.httpClient
      .put(`${this.baseUrl}changePassword/${id}`, {
        oldPassword,
        password,
      })
      .pipe(
        catchError((error) => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error:${error.error.message}`;
          } else {
            errorMsg = this.getServerErrorMessage(error);
          }

          return throwError(errorMsg);
        })
      );
  }
  getAllAdmins(): void {
    this.httpClient.get<User[]>(this.baseUrl).subscribe(
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
  getAdminById(id: number) {
    return this.httpClient.get<User>(`${this.baseUrl}${id}`);
  }
  deleteAdmin(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
  addAdmin(admin: User): void {
    this.dialogData = admin;
    // this.httpClient.post(`${this.baseUrl}/`, admin).subscribe((data) => {
    //   this.dialogData = admin;
    // });
  }

  updateAdmin(admin: User): void {
    /* this.httpClient.put(this.API_URL + doctors.id, doctors).subscribe(data => {
      this.dialogData = doctors;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  updateAdminAccount(id: number, admin: User): Observable<Object> {
    this.dialogData = admin;
    return this.httpClient.put(`${this.baseUrl}updateAdmin/${id}`, admin).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error:${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
          //console.log(errorMsg);
        }

        return throwError(errorMsg);
      })
    );
  }
  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401: {
        return `${error.statusText}`;
      }
      case 404: {
        return `Not Found :${error.message}`;
      }

      case 403: {
        return `Access Denied:${error.message}`;
      }

      case 500: {
        return `Internal Server Error:${error.message}`;
      }

      default: {
        return `Unknon Server Error: ${error.message}`;
      }
    }
  }
}
