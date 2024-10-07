import {Component, OnInit} from '@angular/core';
import {UserService} from "@services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {SharedImports} from "../../shared/imports/SharedImports";
import {RoleType} from "@models/enums/RoleType";
import {StatusType} from "@models/enums/statusType";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarService} from "@services/SnackbarService";
import {ServerAuthResponse} from "@models/auth/server-auth-response";
import {AuthService} from "@services/auth.service";
import {UserStateService} from "@services/user-state.service";
import { User } from '@models/users/user';
import {ErrorService} from "@services/errors/error.service";

@Component({
  selector: 'denmark-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SharedImports,
    MatSnackBarModule,
    NgIf,
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class FormComponent implements OnInit {
  authForm: FormGroup;
  isSignUp = false;
  currentUser: User | null = null;

  constructor(
    private auth: AuthService,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private errorService: ErrorService
  ) {
    this.authForm = this.createFormGroup();
  }

  ngOnInit(): void {
    console.log('Form');
  }

  toggleSign(): void {
    this.isSignUp = !this.isSignUp;
    this.authForm.reset();
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.snackbar.open('Preencha todos os campos obrigatórios corretamente.', StatusType.WARNING);
      return;
    }
    this.isSignUp ? this.handleSignUp() : this.handleSignIn();
  }

  private handleSignUp(): void {
    const userData = this.getUserDataFromForm();
    this.user.create(userData).subscribe({
      next: (response: ServerAuthResponse) => {
        this.auth.handleAuthResponse(response, 'create');
        this.router.navigateByUrl('').then(r => console.log('Redirect:', r));
      }, error: (error) => this.errorService.handleError(error).subscribe()
    });
  }

  private handleSignIn(): void {
    const { email, password } = this.authForm.value;
    this.auth.login({ email, password }).subscribe({
      next: (response: ServerAuthResponse) => {
        this.auth.handleAuthResponse(response, 'login');
        this.snackbar.open('Usuário logado com sucesso!', StatusType.SUCCESS);
        this.router.navigateByUrl('').then(r => console.log('Redirect:', r));
      }, error: (error) => this.errorService.handleError(error).subscribe()
    });
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
      avatar: ['']
    });
  }

  private getUserDataFromForm() {
    return {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
      name: this.authForm.value.name,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRySwnnjP05zFpSJ4EDWK9hy9CTXUDDaPbqw&s',
      role: RoleType.USER,
    };
  }
}
