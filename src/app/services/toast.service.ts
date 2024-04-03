import { Injectable, inject, signal } from '@angular/core';
import { toastType } from '../models/enums/toastType.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { ToastComponent } from '../components/toast-handler/toast/toast.component';
import { dynamicComponent } from '../models/interfaces/dynamic-component.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly isToastShowing = signal(false);
  readonly isToastShowing$ = toObservable(this.isToastShowing);

  private readonly currentToastData = signal<dynamicComponent>({ component: ToastComponent, inputs: {} });
  readonly currentToastData$ = toObservable(this.currentToastData);

  makeToast(type: toastType, title: string, body: string, timer: number = 2000) {
    this.isToastShowing.set(true);

    this.currentToastData.update((ctd => {
      return {
        ...ctd,
        inputs: {
          type,
          title,
          description: body
        }
      }
    }))

    setTimeout(() => {
      this.isToastShowing.set(false);
    }, timer)
  }
}

