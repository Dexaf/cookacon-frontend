import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as storeActions from '@store/action';
import { AppState } from '@store/interfaces';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  store: Store<AppState> = inject(Store<AppState>)
  openLoginModal() {
    this.store.dispatch(storeActions.openLoginModal());
  }

  openSignModal() {
    this.store.dispatch(storeActions.openSigninModal());

  }
}
