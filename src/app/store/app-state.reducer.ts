import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app-state.interface";
import * as appStateAction from "./app-state.actions"

export const initialState: AppState = {
  isLoginModalOpened: false,
  isSigninModalOpened: false,
  currentUser: {
    authToken: null,
    name: null,
    surname: null,
    countryCode: null,
    description: null,
    email: null,
    profilePictureUrl: null,
    username: null
  }
}

export const AppStateReducer = createReducer(
  initialState,
  //LOGIN MODAL
  on(appStateAction.openLoginModal, (state) => ({ ...state, isLoginModalOpened: true })),
  on(appStateAction.closeLoginModal, (state) => ({ ...state, isLoginModalOpened: false })),
  //SIGNIN MODAL
  on(appStateAction.openSigninModal, (state) => ({ ...state, isSigninModalOpened: true })),
  on(appStateAction.closeSigninModal, (state) => ({ ...state, isSigninModalOpened: false })),
  //AUTH
  on(appStateAction.addAuthToken, (state, props) => ({ ...state, currentUser: { ...state.currentUser, authToken: props.authToken } })),
  on(appStateAction.nullToken, (state) => ({ ...state, currentUser: { ...state.currentUser, authToken: null } })),
  //USER-DATA
  on(appStateAction.addLoggedUserProfile, (state, props) => ({...state, currentUser: {...state.currentUser, ...props.userProfile}}))
)