import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app-state.interface";

const appStateFeature = createFeatureSelector<AppState>("appState")

//SELECTORS
export const isLoginModalOpened$ = createSelector(appStateFeature, (state) => state.isLoginModalOpened)
export const isSigninModalOpened$ = createSelector(appStateFeature, (state) => state.isSigninModalOpened)
export const getAuthToken$ = createSelector(appStateFeature, (state) => state.currentUser.authToken)