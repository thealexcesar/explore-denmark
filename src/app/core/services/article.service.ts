import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {ErrorService} from "@services/error.service";
import {environment} from "@environments/environment";
import {Article} from "@models/articles/article";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  create(data: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, data).pipe(
      catchError((e) => this.errorService.handleError(e))
    );
  }

  /*findAll(page: number = 1, pageSize: number = 10): Observable<Article[]> {
    return this.http
      // .get<Article[]>(`${this.apiUrl}?_page=${page}&_limit=${pageSize}`)
      // .pipe(catchError((e) => this.errorService.handleError(e)));
  }*/

  findAll(filters: { [key: string]: any } = {}): Observable<Article[]> {
    const query = this.buildQuery(filters);
    return this.http.get<Article[]>(`${this.apiUrl}${query}`);
  }

  findById(articleId: number): Observable<Article> {
    return this.http
      .get<Article>(`${this.apiUrl}/${articleId}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  update(data: Article): Observable<Article> {
    return this.http
      .put<Article>(`${this.apiUrl}/${data.id}`, data)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  delete(articleId: number): Observable<number> {
    return this.http
      .delete<number>(`${this.apiUrl}/${articleId}`)
      .pipe(catchError((e) => this.errorService.handleError(e)));
  }

  private buildQuery(filters: { [key: string]: any }): string {
    const query = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) { query.append(key, filters[key]); }
    });
    return query.toString() ? `?${query.toString()}` : '';
  }
}
