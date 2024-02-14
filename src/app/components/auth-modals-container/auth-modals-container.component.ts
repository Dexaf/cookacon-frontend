import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeLoginModal, closeSigninModal } from '@store/actions';
import { AppState } from '@store/interfaces';
import * as storeSelectors from '@store/selectors';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { IconsModule } from '../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-auth-modals-container',
  standalone: true,
  imports: [
    ModalWrapperComponent,
    IconsModule,
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './auth-modals-container.component.html',
  styleUrls: ['./auth-modals-container.component.scss', '../../../styles.scss']
})
export class AuthModalsContainerComponent {
  store = inject(Store<AppState>)
  isLoginModalOpened$ = this.store.select(storeSelectors.isLoginModalOpened$);
  isSigninModalOpened$ = this.store.select(storeSelectors.isSigninModalOpened$);

  closeLoginModal() {
    this.store.dispatch(closeLoginModal());
  }

  closeSigninModal() {
    this.store.dispatch(closeSigninModal());
  }
}
