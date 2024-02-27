import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { IconsModule } from '../../../icons.module';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { finalize } from 'rxjs/operators';
import { toastType } from '../../../models/enums/toastType.enum';
import * as appStateAction from '@store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-form',
  standalone: true,
  imports: [
    TranslocoModule,
    IconsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss', '../../../../styles.scss']
})
export class LogInFormComponent {
  //services
  store = inject(Store<AppState>);
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  translocoService = inject(TranslocoService);
  router = inject(Router);

  //vars
  logInForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  logInReqLoading: boolean = false;

  //methods
  submitLogInForm() {
    this.logInReqLoading = true;

    this.authService.logIn({
      username: this.logInForm.controls.username.value!,
      password: this.logInForm.controls.password.value!
    })
      .pipe(finalize(() => { this.logInReqLoading = false; }))
      .subscribe((res) => {
        const title = this.translocoService.translate("logInModal.success.title");
        this.toastService.makeToast(toastType.Success, title, "", 3000)
        this.store.dispatch(appStateAction.addAuthToken({ authToken: res.token }))
        this.router.navigate(["/user/own"]);
        this.store.dispatch(appStateAction.closeLoginModal());
      })
  }

  openSignInModal() {
    this.store.dispatch(appStateAction.closeLoginModal());
    this.store.dispatch(appStateAction.openSigninModal());
  }
}
