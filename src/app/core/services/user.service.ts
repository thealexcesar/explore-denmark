import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserForm, UserParams} from "@models/users/user";
import {environment} from "@environments/environment";
import {ServerAuthResponse} from "@models/auth/server-auth-response";
import {ErrorService} from "@services/error.service";
import {SnackbarService} from "@services/SnackbarService";
import {StatusType} from "@models/enums/statusType";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.userUrl;

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private snackbar: SnackbarService,
  ) {}

  getUsers(nameFilter?: string, limit: number = 10): Observable<User[]> {
    let url = `${this.url}/users?limit=${limit}`;
    if (nameFilter) {
      url += `&name=${encodeURIComponent(nameFilter)}`;
    }
    return this.http.get<User[]>(url).pipe(catchError((e) => this.error.handleError(e)));
  }

  login(login: UserParams): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/auth/login`, login).pipe(
      tap(response => this.handleAuthResponse(response, 'login')),
      catchError((e) => this.error.handleError(e))
    );
  }

  create(user: UserForm): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/users`, user).pipe(
      tap(response => {
        this.handleAuthResponse(response, 'create');
        this.snackbar.open('Usuário criado com sucesso!', StatusType.SUCCESS);
      }),
      catchError((e) => this.error.handleError(e))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getCurrentUser(): User | null {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) return null;

    try {
      return JSON.parse(currentUserData);
    } catch (e) {
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.snackbar.open('Usuário deslogado com sucesso!', StatusType.SUCCESS);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/users/${user.id}`, user).pipe(
      tap(() => this.snackbar.open('Usuário atualizado com sucesso!', StatusType.SUCCESS)),
      catchError((e) => this.error.handleError(e))
    );
  }

  delete(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/users/${userId}`).pipe(
      tap(() => this.snackbar.open('Usuário deletado com sucesso!', StatusType.SUCCESS)),
      catchError((e) => this.error.handleError(e))
    );
  }

  private handleAuthResponse(response: ServerAuthResponse, action: 'login' | 'create'): void {
    console.log('Response from API:', response);
    const message = action === 'login' ? 'Usuário logado com sucesso!' : 'Usuário criado com sucesso!';
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.snackbar.open(message, StatusType.SUCCESS);
    console.log('Token stored:', localStorage.getItem('access_token'));
  }
}
