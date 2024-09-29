import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {defaultAuthStatus} from "@models/auth/default-auth-status";
import {UserModel} from "@models/user/user-model";
import {CommonErrors} from "../common/common-errors";
import {HttpClient} from "@angular/common/http";
import {AuthStatus} from "@models/auth/auth-status";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {User} from "@models/user/user";

interface UserParams {
  email: string,
  password: string,
  name?: { first: string; last?: string }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly authStatus = new BehaviorSubject<AuthStatus>(defaultAuthStatus);
  private readonly currentUser = new BehaviorSubject<UserModel>(new UserModel());
  private readonly url = 'https://api.escuelajs.co/api/v1';

  constructor(private httpClient: HttpClient, private injector: Injector) {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }
  }

  get common() {
    return this.injector.get(CommonErrors);
  }

  authenticate(action: 'login' | 'register', params: UserParams): Observable<ServerAuthResponse> {
    const endpoint = this.getEndpoint(action);
    const body = this.createRequestBody(action, params);

    console.log('Request Body:', body);

    return this.httpClient.post<ServerAuthResponse>(endpoint, body).pipe(
      tap((res) => this.handleAuthResponse(res, action, body)),
      catchError((error) => this.common.handleError(error))
    );
  }

  logout(clearToken: boolean = true): void {
    if (clearToken) {
      localStorage.removeItem(this.tokenKey);
    }
    this.authStatus.next(defaultAuthStatus);
    this.currentUser.next(new UserModel());
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private createRequestBody(action: 'login' | 'register', params: UserParams): any {
    const baseBody = { email: params.email, password: params.password };
    return action === 'register' ? { ...baseBody, name: params.name } : baseBody;
  }

  private getEndpoint(action: 'login' | 'register'): string {
    return action === 'login' ? `${this.url}/auth/login` : `${this.url}/users/is-available`;
  }

  private handleAuthResponse(res: ServerAuthResponse, action: 'login' | 'register', body: UserParams): void {
    this.setToken(res.accessToken);

    if (action === 'register') {
      const newUser = UserModel.build(body as User);
      console.log('Registered User Data:', newUser);
    }
  }
}
