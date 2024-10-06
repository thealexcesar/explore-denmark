import {Component, OnInit} from '@angular/core';
import {UserService} from "@services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {SharedImports} from "../../shared/imports/SharedImports";
import {ServerAuthResponse} from "@models/auth/server-auth-status";
import {RoleType} from "@models/enums/RoleType";
import {UserForm} from "@models/users/user";
import {StatusType} from "@models/enums/statusType";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarService} from "@services/SnackbarService";

@Component({
  selector: 'denmark-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedImports,
    MatSnackBarModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;
  isSignUp = false;

  constructor(
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private user: UserService,
    private router: Router
  ) {
    this.authForm = this.createFormGroup();
  }

  ngOnInit(): void {}

  private createFormGroup(): FormGroup {
    return this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl(''),
      avatar: new FormControl('')
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.snackbar.open('Por favor, preencha todos os campos requeridos corretamente.', StatusType.WARNING);
      return;
    }
    this.isSignUp ? this.handleSignUp() : this.handleSignIn();
  }

  toggleSign(): void {
    this.isSignUp = !this.isSignUp;
  }

  private handleSignUp(): void {
    const userData: UserForm = this.getUserDataFromForm();
    this.user.create(userData).subscribe({
      next: (response: ServerAuthResponse) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/login']);
        this.snackbar.open('Usuário criado com sucesso.', StatusType.SUCCESS);
      },
      error: () => this.snackbar.open('Erro ao criar usuário.', StatusType.ERROR),
    });
  }

  private handleSignIn(): void {
    const { email, password } = this.authForm.value;
    this.user.login({ email, password }).subscribe({
      next: (response: ServerAuthResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.user?.role || RoleType.USER);
        this.router.navigateByUrl('').then(success => console.log('redirect', success ? 'success' : 'error'));
      },
      error: () => this.snackbar.open('Usuário ou senha inválidos.', StatusType.ERROR),
    });
  }

  private getUserDataFromForm(): UserForm {
    return {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      name: this.authForm.value.name,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRySwnnjP05zFpSJ4EDWK9hy9CTXUDDaPbqw&s',
      role: RoleType.USER,
    };
  }
}
