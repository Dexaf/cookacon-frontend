import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeLoginModal, closeSigninModal } from '@store/actions';
import { AppState } from '@store/interfaces';
import * as storeSelectors from '@store/selectors';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { IconsModule } from '../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';

@Component({
  selector: 'app-auth-modals-container',
  standalone: true,
  imports: [
    ModalWrapperComponent,
    IconsModule,
    CommonModule,
    TranslocoModule,
    SignInFormComponent,
    LogInFormComponent
  ],
  templateUrl: './auth-modals-container.component.html',
  styleUrls: ['./auth-modals-container.component.scss', '../../../styles.scss']
})
export class AuthModalsContainerComponent {
  //services
  store = inject(Store<AppState>)

  //vars
  isLoginModalOpened$ = this.store.select(storeSelectors.isLoginModalOpened$);
  isSigninModalOpened$ = this.store.select(storeSelectors.isSigninModalOpened$);

  //methods
  closeLoginModal() {
    this.store.dispatch(closeLoginModal());
  }

  closeSigninModal() {
    this.store.dispatch(closeSigninModal());
  }
}
