import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as appStateActions from "@store/actions";
import { exhaustMap, map, withLatestFrom } from "rxjs";
import { UserDataService } from "../services/user-data.service";
import * as appStateAction from '@store/actions';
import { Store, select } from "@ngrx/store";
import { AppState } from "./app-state.interface";
import { getAuthToken$ } from "./app-state.selectors";

@Injectable()
export class AppStateEffects {
  //services
  private readonly actions$ = inject(Actions);
  private readonly userDataService = inject(UserDataService);
  private readonly store = inject(Store<AppState>);

  //effects
  loadProfile$ = createEffect(() => this.actions$.pipe(
    ofType(appStateActions.addAuthToken),
    withLatestFrom(this.store.pipe(select(getAuthToken$))),
    exhaustMap(() => this.userDataService.getLoggedUserProfile()
      .pipe(map(userProfile => appStateAction.addLoggedUserProfile({ userProfile })))
    )
  ));
}