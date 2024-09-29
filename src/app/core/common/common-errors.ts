import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // This makes it globally available
})
export class CommonErrors {

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

    console.error(errorMessage); // Log the error message for debugging
    return throwError(() => new Error(errorMessage));
  }
}
