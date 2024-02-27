import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { openLoginModal } from '@store/actions';
import { AppState } from '@store/interfaces';
import { getAuthToken$ } from '@store/selectors';
import { take } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { toastType } from '../models/enums/toastType.enum';
import { TranslocoService } from '@ngneat/transloco';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  let authToken: string | null = null;

  store.select(getAuthToken$)
    .pipe(take(1))
    .subscribe(_authToken => authToken = _authToken);
  if (authToken)
    return true
  else {
    const router = inject(Router);
    const toastService = inject(ToastService);
    const translocoService = inject(TranslocoService);

    store.dispatch(openLoginModal());
    const title = translocoService.translate("errorCodes.mainProblems.NO_AUTHORIZATION_TOKEN")
    toastService.makeToast(toastType.Info, title, "", 3000);
    router.navigate(['']);
    return false;
  }
};
