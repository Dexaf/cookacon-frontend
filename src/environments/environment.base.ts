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
      viewUserRecipe: ":userId/:recipeId",
      addUserRecipe: "/add",
      updateUserRecipe: "/own/:recipeId",
      updateUserRecipeIngredient: "/own/:recipeId/ingredient/:ingredientId",
      addUserRecipeIngredient: "/own/:recipeId/ingredient/add",
      updateUserRecipeStep: "/own/:recipeId/step/:stepId",
      addUserRecipeStep: "/own/:recipeId/step/add"
    }
  }
}