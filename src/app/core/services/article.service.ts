import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {ErrorService} from "@services/errors/error.service";
import {environment} from "@environments/environment";
import {Article} from "@models/articles/article";
import {Observable} from "rxjs";
import {SnackbarService} from "@services/SnackbarService";
import {StatusType} from "@models/enums/statusType";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient, private error: ErrorService, private snackbar: SnackbarService) {}

  create(data: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, data).pipe(
      catchError((error) => this.handleError(error))
    ).pipe(tap(() => this.snackbar.open('Artigo criado com sucesso!', StatusType.SUCCESS)));
  }

  findAll(filters: { [key: string]: any } = {}): Observable<Article[]> {
    const query = this.buildQuery(filters);
    return this.http.get<Article[]>(`${this.apiUrl}${query}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  findById(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${articleId}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  update(data: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${data.id}`, data).pipe(
      catchError((error) => this.handleError(error))
    ).pipe(tap(() => this.snackbar.open('Artigo atualizado com sucesso!')));
  }

  delete(articleId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${articleId}`).pipe(
      catchError((error) => this.handleError(error))
    ).pipe(tap(() => this.snackbar.open('Artigo deletado com sucesso!')));
  }

  private handleError(error: any): Observable<never> {
    return this.error.handleError(error);
  }

  private buildQuery(filters: { [key: string]: any }): string {
    const query = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) { query.append(key, filters[key]); }
    });
    return query.toString() ? `?${query.toString()}` : '';
  }
}
