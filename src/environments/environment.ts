export const environment = {
  baseUrl: "http://localhost:4200",
  providerUrl: "http://localhost:3000",
  endpoints: {
    auth: {
      controller: "auth",
      signin: "signin",
      login: "login"
    },
    userData: {
      controller: "userData",
      ownProfile: "profile/own"
    }
  }
};
