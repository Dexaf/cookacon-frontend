import { Injectable, inject } from '@angular/core';
import { logInDtoOut, signInDtoOut } from '../models/dtos/out/auth.dto.out.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { logInDtoIn, signInDtoIn } from '../models/dtos/in/auth.dto.in.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //services
  private readonly http = inject(HttpClient);

  //methods
  signIn(userData: signInDtoOut): Observable<signInDtoIn> {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.controller}/${environment.endpoints.auth.signin}`
    return this.http.post<signInDtoIn>(url, userData);
  }

  logIn(userData: logInDtoOut): Observable<logInDtoIn> {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.controller}/${environment.endpoints.auth.login}`
    return this.http.post<logInDtoIn>(url, userData);
  }
}
