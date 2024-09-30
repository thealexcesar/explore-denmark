import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root',
})
export class CommonErrors {

  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse | any): Observable<never> {
    let errorMessage = 'An unknown error has occurred';

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error! ${error.error.message}`;
      } else {
        errorMessage = `Request failed with ${error.status} ${error.statusText}`;
      }
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else {
      errorMessage = error.message || errorMessage;
    }

    console.error(errorMessage);
    this.showErrorNotification(errorMessage); // Show notification to the user
    return throwError(() => new Error(errorMessage));
  }

  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
