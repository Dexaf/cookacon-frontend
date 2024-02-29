import { Injectable, inject } from '@angular/core';
import { logInDtoOut, signInDtoOut } from '../models/dtos/out/auth.dto.out.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { logInDtoIn, signInDtoIn } from '../models/dtos/in/auth.dto.in.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { addAuthToken } from '@store/actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //services
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store<AppState>);

  //methods
  signIn(userData: signInDtoOut): Observable<signInDtoIn> {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.controller}/${environment.endpoints.auth.signin}`
    return this.http.post<signInDtoIn>(url, userData);
  }

  logIn(userData: logInDtoOut): Observable<logInDtoIn> {
    const url = `${environment.providerUrl}/${environment.endpoints.auth.controller}/${environment.endpoints.auth.login}`
    return this.http.post<logInDtoIn>(url, userData);
  }

  loadAuthToken(authToken: string) {
    this.store.dispatch(addAuthToken({ authToken }));
    const day = new Date();
    //make it tomorrow date
    day.setDate(day.getDate() + 1);
    document.cookie = `__cookacon__authToken=${authToken};expires=${day.toUTCString()}`;
  }

  loadAuthTokenFromCookie() {
    const authTokenCookie = document.cookie.split(";").find(cookies => cookies.includes("__cookacon__authToken"));
    if (authTokenCookie) {
      const authToken = authTokenCookie.split("=")[1];
      if (authToken)
        this.store.dispatch(addAuthToken({ authToken }));
    }
  }
}
