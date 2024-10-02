import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {defaultAuthStatus} from "@models/auth/default-auth-status";
import {UserModel} from "@models/user/user-model";
import {HttpClient} from "@angular/common/http";
import {AuthStatus} from "@models/auth/auth-status";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {User} from "@models/user/user";
import {RoleType} from "@models/enums/RoleType";
import {environment} from "@environments/environment";
import {CommonErrors} from "../common/common-errors";
import {UserParams} from "@models/user/user-params";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'token';
  private readonly authStatus = new BehaviorSubject<AuthStatus>(defaultAuthStatus);
  private readonly currentUser = new BehaviorSubject<UserModel>(new UserModel());
  private readonly url = environment.apiUrl;

  constructor(private httpClient: HttpClient, private injector: Injector) {
    const token = this.getToken();
    if (token) {
      this.setToken(token);
    }
  }

  authenticate(action: 'sign_in' | 'sign_up', params: UserParams): Observable<ServerAuthResponse> {
    const endpoint = this.getEndpoint(action);
    const body = this.createRequestBody(action, params);

    return this.httpClient.post<ServerAuthResponse>(endpoint, body, {withCredentials: false})
      .pipe(
        tap((res) => this.handleAuthResponse(res, action, body)),
        catchError((error) => this.common.handleError(error))
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): UserModel {
    return this.currentUser.getValue();
  }

  logout(): void {
    this.setToken('');
    this.currentUser.next(new UserModel());
    this.authStatus.next(defaultAuthStatus);
  }

  private getEndpoint(action: 'sign_in' | 'sign_up'): string {
    return `${this.url}/auth/${action}`;
  }

  private handleAuthResponse(res: ServerAuthResponse, action: 'sign_in' | 'sign_up', body: UserParams): void {
    this.setToken(res.accessToken);

    if (action === 'sign_in') {
      if (res.user) this.currentUser.next(new UserModel().build(res.user));
      return;
    }

    const newUser: User = {
      id: 0,
      avatar: '',
      email: body.email,
      dateOfBirth: null,
      isActive: true,
      name: (body as UserParams).name || '',
      password: body.password,
      role: RoleType.USER
    };
    this.currentUser.next(new UserModel().build(newUser));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private createRequestBody(action: 'sign_in' | 'sign_up', params: UserParams): any {
    const baseBody = {email: params.email, password: params.password};
    return action === 'sign_up' ? {...baseBody, name: (params as UserParams).name} : baseBody;
  }

  private get common() {
    return this.injector.get(CommonErrors);
  }
}
