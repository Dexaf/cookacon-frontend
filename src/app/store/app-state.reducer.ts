import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app-state.interface";
import * as appStateAction from "./app-state.actions"

export const initialState: AppState = {
  isLoginModalOpened: false,
  isSigninModalOpened: false
}

export const AppStateReducer = createReducer(
  initialState,
  on(appStateAction.openLoginModal, (state) => ({ ...state, isLoginModalOpened: true })),
  on(appStateAction.closeLoginModal, (state) => ({ ...state, isLoginModalOpened: false })),
  on(appStateAction.openSigninModal, (state) => ({ ...state, isSigninModalOpened: true })),
  on(appStateAction.closeSigninModal, (state) => ({ ...state, isSigninModalOpened: false }))
)