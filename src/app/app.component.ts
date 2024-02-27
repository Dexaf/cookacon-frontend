import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AuthModalsContainerComponent } from './components/auth-modals-container/auth-modals-container.component';
import { ToastHandlerComponent } from './components/toast-handler/toast-handler/toast-handler.component';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavBarComponent,
    AuthModalsContainerComponent,
    CommonModule,
    ToastHandlerComponent
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  translocoService = inject(TranslocoService);
  translocoSubscription: Subscription | null = null;

  ngOnInit(): void {
    let activeLanguage = this.translocoService.getActiveLang();
    this.translocoSubscription = this.translocoService.load(activeLanguage).subscribe();
  }

  ngOnDestroy(): void {
    if (this.translocoSubscription)
      this.translocoSubscription.unsubscribe();
  }
}
