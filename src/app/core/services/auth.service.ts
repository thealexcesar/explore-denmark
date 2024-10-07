import { Injectable } from '@angular/core';
import {User, UserParams} from "@models/users/user";
import {environment} from "@environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ErrorService} from "@services/errors/error.service";
import {Observable, throwError} from "rxjs";
import {ServerAuthResponse} from "@models/auth/server-auth-response";
import {catchError, tap} from "rxjs/operators";
import {StatusType} from "@models/enums/statusType";
import {SnackbarService} from "@services/SnackbarService";
import {UserStateService} from "@services/user-state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.userUrl;

  constructor(
    private http: HttpClient,
    private error: ErrorService,
    private snackbar: SnackbarService,
    private userState: UserStateService
  ) {}

  login(login: UserParams): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/auth/login`, login).pipe(
      tap(response => {
        console.log('Login response:', response);
        this.handleAuthResponse(response, 'login');
      }), catchError((e) => this.error.handleError(e))
    );
  }

  handleAuthResponse(response: ServerAuthResponse, action: 'login' | 'create'): void {
    if (response.access_token) {
      sessionStorage.setItem('access_token', response.access_token);
    }
    if (response.user) {
      this.userState.setCurrentUser(response.user);
    } else {
      this.snackbar.open('Usuário não encontrado.', StatusType.ERROR);
    }
    this.snackbar.open(this.msg(action === 'login' ? 'logado' : 'criado'), StatusType.SUCCESS);
    this.getCurrentUser().subscribe();
  }


  private getCurrentUser(): Observable<User> {
    const token = sessionStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<User>(`${this.url}/auth/profile`, { headers }).pipe(
      tap((user) => {
        this.userState.setCurrentUser(user);
        sessionStorage.setItem('current_user', JSON.stringify(user));
      }), catchError((e) => this.error.handleError(e))
    );
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('current_user');
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('current_user');
    this.userState.setCurrentUser(null);
    this.snackbar.open('Logout realizado com sucesso.', StatusType.SUCCESS);
  }

  private msg(action: string): string {
    return `Usuário ${action} com sucesso.`;
  }
}
