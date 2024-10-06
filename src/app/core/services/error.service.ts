import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {StatusType} from "@models/enums/statusType";
import {SnackbarService} from "@services/SnackbarService";

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private router: Router, private snackbar: SnackbarService) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    const message = this.getErrorMessage(this.getErrorType(error.status));
    this.snackbar.open(message, StatusType.WARNING);

    setTimeout(() => this.router.navigate(['/']), 900000);
    // Fixme UP to '700' ms
    return throwError(() => new Error('Erro ao processar a requisição.'));
  }

  private getErrorType(status: number): StatusType {
    return StatusType[status === 404 ? 'WARNING' : 'ERROR'];
  }

  private getErrorMessage(statusType: StatusType): string {
    const messages: { [key in StatusType]: string } = {
      [StatusType.WARNING]: 'Página não encontrada! Redirecionando para a Home.',
      [StatusType.ERROR]: 'Ocorreu um erro desconhecido! Por favor, entre em contato com o administrador.',
      [StatusType.SUCCESS]: 'Operação realizada com sucesso!',
    };
    return messages[statusType] || 'Erro ao carregar conteúdo! Redirecionando para a Home.';
  }
}
