import {Injectable, Injector} from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserParams} from "@models/user/user";
import {environment} from "@environments/environment";
import {ServerAuthResponse} from "@models/auth/server-auth-status";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = environment.userUrl;
  constructor(private http: HttpClient) {}

  getUsers(nameFilter?: string, limit: number = 10): Observable<User[]> {
    let url = `${this.url}/users?limit=${limit}`;
    if (nameFilter) {
      url += `&name=${encodeURIComponent(nameFilter)}`;
    }
    return this.http.get<User[]>(url);
  }

  login(login: UserParams): Observable<ServerAuthResponse> {
    return this.http.post<ServerAuthResponse>(`${this.url}/auth`, login).pipe(
      tap(response => this.handleAuthResponse(response, 'login')),
      catchError(this.handleError('login'))
    );
  }

  create(user: UserParams): Observable<any> {
    return this.http.post<any>(`${this.url}/users/is-available`, user).pipe(
      tap(response => this.handleAuthResponse(response, 'create')),
      catchError(this.handleError('create'))
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }


  getCurrentUser(): User | null {
    const currentUserData = localStorage.getItem('currentUser');

    if (!currentUserData) {
      console.warn("No current user found in localStorage.");
      return null;
    }

    try {
      return JSON.parse(currentUserData);
    } catch (error) {
      console.error("Error parsing current user data:", error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  updateUserStatus(): void {
    const user = this.getCurrentUser();
    if (user) {

    } else {
      console.warn("User is not defined.");
    }
  }

  private handleAuthResponse(response: ServerAuthResponse, action: 'login' | 'create'): void {
    console.log(action === 'login' ? 'Usuário logado com sucesso:' : 'Usuário criado com sucesso:', response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
  }

  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation} falhou:`, error);
      return throwError(() => new Error(`${operation} falhou. Tente novamente mais tarde.`));
    };
  }
}
