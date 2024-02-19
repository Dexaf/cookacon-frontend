import { Injectable, inject } from '@angular/core';
import { signInDtoOut } from '../models/dtos/out/signIn.dto.out.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //services
  http = inject(HttpClient);

  //methods
  signIn(userData: signInDtoOut) {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.signin}`
    this.http.post(url, userData).subscribe();  
  }
}
