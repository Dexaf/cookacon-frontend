import { Injectable } from '@angular/core';
import { signInDtoOut } from '../models/dtos/out/signIn.dto.out.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signIn(userData: signInDtoOut) {
    console.log(userData);
  }
}
