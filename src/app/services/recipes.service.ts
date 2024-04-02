import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/interfaces/recipe.interface';
import { ingredientDtoOut, RecipeDtoOut, stepDtoOut } from '../models/dtos/out/recipe.dto.out.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  httpClient = inject(HttpClient);

  getRecipe(userId: string, recipeId: string) {
    let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.viewUserRecipe}`
    url = url.replace(":recipeId", recipeId).replace(":userId", userId);
    return this.httpClient.get<Recipe>(url);
  }

  //TODO - CONNECT TO BE
  updateRecipeRoutine(recipeDtoOut: RecipeDtoOut) {
    this.updateRecipe(recipeDtoOut);
    this.updateIngredients(recipeDtoOut.ingredients);
    this.updateSteps(recipeDtoOut.steps);
  }
  
  updateRecipe(recipeDtoOut: RecipeDtoOut) {
    console.log(recipeDtoOut);
  }

  updateIngredients(ingredients: ingredientDtoOut[]) {
    console.log(ingredients);
  }

  updateSteps(steps: stepDtoOut[]) {
    console.log(steps);
  }
}
