import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeLoginModal, closeSigninModal } from '@store/actions';
import { AppState } from '@store/interfaces';
import * as storeSelectors from '@store/selectors';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { IconsModule } from '../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { arePasswordsEquals, isStrongPassword } from './signInForm-validators';

@Component({
  selector: 'app-auth-modals-container',
  standalone: true,
  imports: [
    ModalWrapperComponent,
    IconsModule,
    CommonModule,
    TranslocoModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth-modals-container.component.html',
  styleUrls: ['./auth-modals-container.component.scss', '../../../styles.scss']
})
export class AuthModalsContainerComponent {
  //services
  store = inject(Store<AppState>)
  formBuilder = inject(FormBuilder)
  //vars
  isLoginModalOpened$ = this.store.select(storeSelectors.isLoginModalOpened$);
  isSigninModalOpened$ = this.store.select(storeSelectors.isSigninModalOpened$);

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
  closeLoginModal() {
    this.store.dispatch(closeLoginModal());
  }

  closeSigninModal() {
    this.store.dispatch(closeSigninModal());
  }
}
