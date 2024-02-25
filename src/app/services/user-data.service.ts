import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserData } from '@store/interfaces';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  //services
  private readonly http = inject(HttpClient);

  //methods
  getLoggedUserProfile() {
    const url = `${environment.providerUrl}/${environment.endpoints.userData.controller}/${environment.endpoints.userData.ownProfile}`
    return this.http.get<UserData>(url);
  }
}
