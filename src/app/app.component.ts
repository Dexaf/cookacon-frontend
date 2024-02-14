import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./layout/nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';
import { AuthModalsContainerComponent } from './components/auth-modals-container/auth-modals-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    NavBarComponent,
    AuthModalsContainerComponent,
    CommonModule
  ]
})
export class AppComponent {

}
