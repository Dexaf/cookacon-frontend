import { Injectable, inject } from '@angular/core';
import { signInDtoOut } from '../models/dtos/out/signIn.dto.out.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { signInDtoIn } from '../models/dtos/in/signIn.dto.in.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //services
  http = inject(HttpClient);

  //methods
  signIn(userData: signInDtoOut): Observable<signInDtoIn> {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.signin}`
    return this.http.post<signInDtoIn>(url, userData);
  }
}
