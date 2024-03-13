export const environmentBase = {
  endpoints: {
    auth: {
      controller: "auth",
      signin: "signin",
      login: "login"
    },
    userData: {
      controller: "userData",
      ownProfile: "profile/own"
    },
    feed: {
      controller: "feed",
      searchSuggestion: "searchSuggestion",
      searchByTitle: "searchByTitle",
      mostPopular: "mostPopular",
      general: "general",
      personal: "personal",
      own: "own"
    },
    recipes: {
      controller: "recipes",
      viewUserRecipe: ":userId/:recipeId"
    }
  }
}