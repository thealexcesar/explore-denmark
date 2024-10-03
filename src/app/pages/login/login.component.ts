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
  private status: string = 'error'

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private router: Router,
    private toast: ToastrService
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
      (this.toast as any)[this.status]('Por favor, preencha todos os campos requeridos corretamente.', 'Alerta');
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
        this.status = 'success';
        // (this.toast as any)[this.status](this.status, 'created' | translate, this.status | translate); // TCC referencia -> fazer funcao generica.
        (this.toast as any)[this.status](this.status, 'Usuário criado com sucesso.', "Sucesso");
        this.router.navigate(['/login']).then(r => console.log('router:', r));
      },
      error: () => {
        (this.toast as any)[this.status](this.status, 'Erro ao criar usuário', 'Erro');
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
        this.router.navigateByUrl('').then(r => console.log('redirect:', r));
      },
      error: () => {
        (this.toast as any)[this.status](this.status, 'Usuário ou senha inválidos', 'Erro');
      }
    });
  }
}
