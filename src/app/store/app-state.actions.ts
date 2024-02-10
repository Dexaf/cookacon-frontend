import { createAction } from "@ngrx/store";

//LOGIN MODAL
export const openLoginModal = createAction("[App modal handler] open login modal");
export const closeLoginModal = createAction("[App modal handler] close login modal");

//SIGNIN MODAL
export const openSigninModal = createAction("[App modal handler] open signin modal");
export const closeSigninModal = createAction("[App modal handler] close signin modal");