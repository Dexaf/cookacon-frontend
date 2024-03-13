import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/interfaces/recipe.interface';

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
}
