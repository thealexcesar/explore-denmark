import { Injectable } from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  private readonly apiUrl = environment.apiUrl;

  http(action: 'login' | 'register' | string): string {
    const endpoint = action === 'login' || action === 'register' ? `auth/${action}` : action;
    const fullUrl = `${this.apiUrl}/${endpoint}`;
    console.log(fullUrl);
    return fullUrl;
  }
}
