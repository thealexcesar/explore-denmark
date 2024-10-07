import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
/**
 * Fala Professor, escolhi esse estilo com polimorfismo no tratamendo de erro.
 * Assim fica mais facil, porque eu adiciono um handler para cada resposta de status HTTP.
 * Caso necessite adiciono mais futuramente e trato a resposta adequada no meu snackbar.
 * */
export interface ErrorHandlerInterface {
  handle(error: HttpErrorResponse): Observable<never>;
}
