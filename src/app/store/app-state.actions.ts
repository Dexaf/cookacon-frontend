import { createAction, props } from "@ngrx/store";
import { UserData } from "./app-state.interface";

//LOGIN MODAL
export const openLoginModal = createAction("[App modal handler] open login modal");
export const closeLoginModal = createAction("[App modal handler] close login modal");

//SIGNIN MODAL
export const openSigninModal = createAction("[App modal handler] open signin modal");
export const closeSigninModal = createAction("[App modal handler] close signin modal");

//JWTOKEN HANDLING
export const addAuthToken = createAction("[Auth handler] add token to app state", props<{ authToken: string }>());
export const nullToken = createAction("[Auth handler] remove token in app state");

//LOGGEDN USER
export const addLoggedUserProfile = createAction("[User data handler] add profile data to app state", props<{ userProfile: UserData }>());