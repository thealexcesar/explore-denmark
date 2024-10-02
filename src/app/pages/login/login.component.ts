import {Component} from '@angular/core';
import {UserService} from "@services/user.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModules} from "../../shared/modules/material-modules";
import {UserParams} from "@models/user/user-params";

@Component({
  selector: 'denmark-login',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModules,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  user: UserParams = { email: '', password: '', name: '' };
  isSignIn = true;
  email: string = '';
  password: string = '';

  constructor(private authService: UserService, private router: Router) {}

  onSubmit(): void {
    const action = this.isSignIn ? 'sign_in' : 'sign_up';
    this.authService.authenticate(action, this.user).subscribe({
      next: () => this.router.navigate(['']),
      error: (error) => console.error(`${action} error:`, error)
    });
  }

  toggleSign(): void {
    this.isSignIn = !this.isSignIn;
    this.isSignIn && this.user.name;
  }
}
