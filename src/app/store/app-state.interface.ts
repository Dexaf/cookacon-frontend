import { CountryCodesEnum } from "../models/enums/countryCodes.enum";

export interface AppState {
  isLoginModalOpened: boolean,
  isSigninModalOpened: boolean
  currentUser: UserData
}

export interface UserData {
  authToken: string | null,
  name: string | null;
  surname: string | null;
  countryCode: CountryCodesEnum | null;
  description: string | null;
  email: string | null;
  profilePictureUrl: string | null;
  username: string | null;
}