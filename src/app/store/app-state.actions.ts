import { createAction, props } from "@ngrx/store";

//LOGIN MODAL
export const openLoginModal = createAction("[App modal handler] open login modal");
export const closeLoginModal = createAction("[App modal handler] close login modal");

//SIGNIN MODAL
export const openSigninModal = createAction("[App modal handler] open signin modal");
export const closeSigninModal = createAction("[App modal handler] close signin modal");

//JWTOKEN HANDLING
export const addToken = createAction("[Auth handler] add token to app state", props<{ token: string }>());
export const nullToken = createAction("[Auth handler] remove token in app state");