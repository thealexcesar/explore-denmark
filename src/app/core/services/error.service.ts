import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() {
  }

  handleError(e: HttpErrorResponse) {
    console.log(e);
    const msg: string | any = (e.error.error) ?
      e.error.error.message : !e.error ? 'Erro de servidor' : 'Erro: verifique se o json-server está rodando na porta 3000\nRode: npm run server'
    return throwError(msg);
  }
}
