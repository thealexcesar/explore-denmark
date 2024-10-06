import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserForm, UserParams} from "@models/users/user";
import {environment} from "@environments/environment";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
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
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) {
      console.warn('Nenhum usuário encontrado no Local Storage.');
      return null;
    }

    try {
      return JSON.parse(currentUserData);
    } catch (e) {
      console.error('Erro ao tratar dados do usuário:', e);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.snackbar.open('Usuário deslogado com sucesso!', StatusType.SUCCESS);
  }

  private handleAuthResponse(response: ServerAuthResponse, action: 'login' | 'create'): void {
    const message = action === 'login' ? 'Usuário logado com sucesso!' : 'Usuário criado com sucesso!';
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.snackbar.open(message, StatusType.SUCCESS);
  }
}
