import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { dynamicComponent } from '../../../models/interfaces/dynamic-component.interface';

@Component({
  selector: 'app-toast-handler',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    NgComponentOutlet
  ],
  template: `
    @if (isToastShowing$ | async) {
      @defer (when isToastShowing$ | async) {
        <ng-container *ngComponentOutlet="(currentToastData$ | async)!.component; inputs: (currentToastData$ | async)!.inputs">
        </ng-container>
      }
    }
  `
})
export class ToastHandlerComponent {
  toastService = inject(ToastService);
  isToastShowing$: Observable<boolean> = this.toastService.isToastShowing$
  currentToastData$: Observable<dynamicComponent> = this.toastService.currentToastData$
}
