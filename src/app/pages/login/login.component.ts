import {Component} from '@angular/core';
import {UserService} from "@services/user.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MaterialModules} from "../../shared/modules/material-modules";
import {ToastrService} from "ngx-toastr";

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
    private toastr: ToastrService
  ) {
    this.authForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      avatar: new FormControl('')
    });
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      this.toastr.warning('Por favor, preencha todos os campos requeridos corretamente.', 'Warning')
      return;
    }
    this.isSignUp ? this.handleSignUp() : this.handleSignIn();
  }

  toggleSign() {
    this.isSignUp = !this.isSignUp;
  }

  private handleSignUp(): void {
    this.user.create(this.authForm.value).subscribe({
      next: () => {
        this.toastr.success('Usuário criado com sucesso.', 'Success');
        this.router.navigate(['/login']).then(r => console.log('router:', r));
      },
      error: () => {
        this.toastr.error('Erro ao criar usuário', 'Error');
      }
    });
  }

  private handleSignIn(): void {
    const loginData = {
      email: this.authForm.value.email,
      password: this.authForm.value.password
    };

    this.user.login(loginData).subscribe({
      next: (response: any) => {
        localStorage.setItem("token", response.access_token);
        localStorage.setItem("role", response.access_role);
        this.router.navigateByUrl('').then(r => console.log('Erro:', r));
      },
      error: () => {
        this.toastr.error('Invalid username or password', 'Error');
      }
    });
  }
}
