import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AuthModalsContainerComponent } from './components/auth-modals-container/auth-modals-container.component';
import { ToastHandlerComponent } from './components/toast-handler/toast-handler/toast-handler.component';
import { ToastService } from './services/toast.service';
import { toastType } from './models/enums/toastType.enum';

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
export class AppComponent {
}
