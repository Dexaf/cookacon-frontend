import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as appStateActions from "@store/actions";
import { exhaustMap, map } from "rxjs";
import { UserDataService } from "../services/user-data.service";
import * as appStateAction from '@store/actions';

@Injectable()
export class AppStateEffects {
  //services
  private readonly actions$ = inject(Actions);
  private readonly userDataService = inject(UserDataService);

  //effects
  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(appStateActions.addAuthToken),
    exhaustMap(() => this.userDataService.getLoggedUserProfile()
      .pipe(map(userProfile => appStateAction.addLoggedUserProfile({ userProfile })))
    )
  ));
}