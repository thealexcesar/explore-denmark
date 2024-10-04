import {Injectable} from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserForm, UserParams} from "@models/users/user";
import {environment} from "@environments/environment";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {ErrorService} from "@services/error.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.userUrl;

  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getUsers(nameFilter?: string, limit: number = 10): Observable<User[]> {
    let url = `${this.url}/users?limit=${limit}`;
    if (nameFilter) {
      url += `&name=${encodeURIComponent(nameFilter)}`;
    }
    return this.http.get<User[]>(url).pipe(
      catchError(err => this.errorService.handleError(err))
    );
  }

  login(login: UserParams): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/auth/login`, login).pipe(
      tap(response => this.handleAuthResponse(response, 'login')),
      catchError(err => this.errorService.handleError(err))
    );
  }

  create(user: UserForm): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/users`, user).pipe(
      tap(response => this.handleAuthResponse(response, 'create')),
      catchError(err => this.errorService.handleError(err))
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getCurrentUser(): User | null {
    const currentUserData = localStorage.getItem('currentUser');
    if (!currentUserData) {
      console.warn("Nenhum usuário encontrado no Local Storage.");
      return null;
    }
    try {
      return JSON.parse(currentUserData);
    } catch (error) {
      console.error("Erro ao tratar dados do usuário:", error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  updateUserStatus(): void {
    const user = this.getCurrentUser();
    if (!user) {
      console.warn("Usuário não definido.");
      return;
    }
    // TODO!
  }

  private handleAuthResponse(response: ServerAuthResponse, action: 'login' | 'create'): void {
    console.log(action === 'login' ? 'Usuário logado com sucesso:' : 'Usuário criado com sucesso:', response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
  }
}
