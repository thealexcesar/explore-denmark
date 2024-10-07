import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "@services/errors/error.service";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  create(data: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, data).pipe(
      catchError((err) => this.errorService.handleError(err))
    );
  }

  findAll(articleId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}?articleId=${articleId}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  delete(commentId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${commentId}`)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }
}
