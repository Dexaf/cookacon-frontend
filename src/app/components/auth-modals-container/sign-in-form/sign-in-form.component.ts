import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { isStrongPassword, arePasswordsEquals } from '../signInForm-validators';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { IconsModule } from '../../../icons.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { finalize } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { toastType } from '../../../models/enums/toastType.enum';

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
  store = inject(Store<AppState>);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  translocoService = inject(TranslocoService);

  //vars
  signInForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.minLength(4), Validators.required]],
    password: ['', [isStrongPassword, Validators.required]],
    passwordCopy: ['', [Validators.required]]
  }, {
    validators: arePasswordsEquals
  })
  signInReqLoading: boolean = false;

  //methods
  submitSignInForm() {
    this.signInReqLoading = true;

    this.authService.signIn({
      email: this.signInForm.controls.email.value!,
      username: this.signInForm.controls.username.value!,
      password: this.signInForm.controls.password.value!,
      passwordCopy: this.signInForm.controls.passwordCopy.value!
    })
      .pipe(finalize(() => { this.signInReqLoading = false; }))
      .subscribe(() => {
        const title = this.translocoService.translate("signInModal.success.title");
        const body = this.translocoService.translate("signInModal.success.body");

        this.toastService.makeToast(toastType.Success, title, body, 3000)
      })
  }
}
