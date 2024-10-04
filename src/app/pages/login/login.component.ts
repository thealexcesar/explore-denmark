import {Component} from '@angular/core';
import {UserService} from "@services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModules} from "../../shared/modules/material-modules";
import {ToastrService} from "ngx-toastr";
import {AuthResponse} from "@models/auth/auth-response";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {RoleType} from "@models/enums/RoleType";
import {UserForm} from "@models/users/user";

@Component({
  selector: 'denmark-login',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModules,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  authForm: FormGroup;
  isSignUp: boolean = false;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      this.toast.error('Por favor, preencha todos os campos requeridos corretamente.', 'Alerta');
      return;
    }
    this.isSignUp ? this.handleSignUp() : this.handleSignIn();
  }

  toggleSign() {
    this.isSignUp = !this.isSignUp;
  }

  private handleSignUp(): void {
    const userData: UserForm = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      name: this.authForm.value.name,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRySwnnjP05zFpSJ4EDWK9hy9CTXUDDaPbqw&s',
      role: RoleType.USER
    };

    this.user.create(userData).subscribe({
      next: (response: ServerAuthResponse) => {
        const { token } = response;
        localStorage.setItem('authToken', token);
        this.toast.success('Usuário criado com sucesso.', "Sucesso");
        this.router.navigate(['/login']).then(r => console.log('Redirecionado para login:', r));
      }, error: () => this.toast.error('Erro ao criar usuário', 'Erro')
    });
  }

  private handleSignIn(): void {
    const { email, password } = this.authForm.value;

    this.user.login({ email, password }).subscribe({
      next: (response: ServerAuthResponse) => {
        const authResponse: AuthResponse = {
          access_token: response.token,
          refresh_token: response.refreshToken || '',
          user: response.user || null,
        };
        localStorage.setItem("token", authResponse.access_token);
        localStorage.setItem("role", authResponse.user?.role || RoleType.USER);
        this.router.navigateByUrl('').then(success => console.log('redirect', success ? 'success' : 'error'));
      }, error: () => this.toast.error('Usuário ou senha inválidos.', 'Erro')
    });
  }
}
