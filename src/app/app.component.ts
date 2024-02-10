import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { AppState } from '@store/interfaces';
import { Store } from '@ngrx/store';
import * as storeSelectors from '@store/selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavBarComponent,
    CommonModule
  ]
})
export class AppComponent {
  store = inject(Store<AppState>)
  isLoginModalOpened$ = this.store.select(storeSelectors.isLoginModalOpened$);
  isSigninModalOpened$ = this.store.select(storeSelectors.isSigninModalOpened$);
}
