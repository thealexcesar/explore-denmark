import {Component, OnInit} from '@angular/core';
import {AuthService} from "@services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RoleType} from "@models/enums/RoleType";
import {MaterialModules} from "../../shared/modules/material-modules";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModules,
    NgIf,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  firstName: string = '';
  lastName: string = '';
  isSignIn: boolean = true;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  OnSubmit() {
    const { email, password } = this.credentials;
    this.isSignIn ? this.login(email, password) : this.register(email, password);
  }

  private login(email: string, password: string): void {
    this.auth.authenticate('login', { email, password }).subscribe({
      next: (res: ServerAuthResponse) => {
        localStorage.setItem("token", res.accessToken);
        this.redirectAfterLogin();
      },
      error: (err) => this.handleError(err)
    });
  }

  private register(email: string, password: string): void {
    if (!this.firstName) {
      alert("O primeiro nome é obrigatório.");
      return;
    }

    const name = { first: this.firstName, last: this.lastName || '' };
    this.auth.authenticate('register', { email, password, name }).subscribe({
      next: (res: ServerAuthResponse) => {
        localStorage.setItem("token", res.accessToken);
        console.log('Registered User Data:', {
          email,
          password,
          name,
          avatar: null,
          isActive: true,
          role: RoleType.USER
        });
        this.redirectAfterLogin();
      },
      error: (err) => this.handleError(err)
    });
  }

  private redirectAfterLogin(): void {
    const redirectUrl = this.route.snapshot.queryParamMap.get('stateUrl') || '';
    this.router.navigateByUrl(redirectUrl).then(r => console.log(r));
  }

  private handleError(err: any): void {
    console.warn(err.message);
    alert('An error occurred: ' + err.message);
  }

  toggleSignIn(): void {
    this.isSignIn = !this.isSignIn;
    this.credentials = { email: '', password: '' };
    this.firstName = '';
    this.lastName = '';
  }
}
