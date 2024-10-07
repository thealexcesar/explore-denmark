import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserForm, UserParams} from "@models/users/user";
import {environment} from "@environments/environment";
import {ErrorService} from "@services/errors/error.service";
import {SnackbarService} from "@services/SnackbarService";
import {StatusType} from "@models/enums/statusType";
import {ServerAuthResponse} from "@models/auth/server-auth-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.userUrl;

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private snackbar: SnackbarService
  ) {}

  getUsers(nameFilter?: string, limit: number = 10): Observable<User[]> {
    let url = `${this.url}/users?limit=${limit}`;
    if (nameFilter) {
      url += `&name=${encodeURIComponent(nameFilter)}`;
    }
    return this.http.get<User[]>(url).pipe(catchError((e) => this.error.handleError(e)));
  }

  create(user: UserForm): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/users/is-available`, user).pipe(
      tap(() => this.snackbar.open(this.msg('criado'), StatusType.SUCCESS)),
      catchError((e) => this.error.handleError(e))
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${user.id}`, user).pipe(
      tap(() => this.snackbar.open(this.msg('atualizado'), StatusType.SUCCESS)),
      catchError((e) => this.error.handleError(e))
    );
  }

  delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/users/${userId}`).pipe(
      tap(() => this.snackbar.open(this.msg('deletado'), StatusType.SUCCESS)),
      catchError((e) => this.error.handleError(e))
    );
  }

  private msg(action: string): string {
    return `Usuário ${action} com sucesso.`
  }
}
