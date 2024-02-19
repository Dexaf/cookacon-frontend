import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { isStrongPassword, arePasswordsEquals } from '../signInForm-validators';
import { TranslocoModule } from '@ngneat/transloco';
import { IconsModule } from '../../../icons.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    TranslocoModule,
    IconsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss', '../../../../styles.scss']
})
export class SignInFormComponent {
  //services
  store = inject(Store<AppState>)
  formBuilder = inject(FormBuilder)

  signInForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.minLength(4), Validators.required]],
    password: ['', [isStrongPassword, Validators.required]],
    passwordCopy: ['', [Validators.required]]
  },
    {
      validators: arePasswordsEquals
    })

  //methods
  submitSignInForm() {
    console.log(this.signInForm.controls)
  }
}
