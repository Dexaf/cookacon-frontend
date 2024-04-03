import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/interfaces/recipe.interface';
import { ingredientDtoOut, RecipeDtoOut, stepDtoOut } from '../models/dtos/out/recipe.dto.out.interface';
import { catchError, forkJoin, Observable } from 'rxjs';
import { ToastService } from './toast.service';
import { toastType } from '../models/enums/toastType.enum';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  httpClient = inject(HttpClient);
  toastService = inject(ToastService);
  translocoService = inject(TranslocoService);

  getRecipe(userId: string, recipeId: string) {
    let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.viewUserRecipe}`
    url = url.replace(":recipeId", recipeId).replace(":userId", userId);
    return this.httpClient.get<Recipe>(url);
  }

  addRecipe(recipeDtoOut: RecipeDtoOut) {
    let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.addUserRecipe}`
    return this.httpClient.post(url, recipeDtoOut);
  }

  updateRecipeRoutine(recipeDtoOut: RecipeDtoOut, recipeId: string) {
    return forkJoin([
      this.updateRecipe(recipeDtoOut, recipeId),
      ...this.updateIngredients(recipeDtoOut.ingredients, recipeId),
      ...this.updateSteps(recipeDtoOut.steps, recipeId)
    ]).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastService.makeToast(toastType.Error, this.translocoService.translate(`errorCodes.errors.${error.error.errors[0].msg.message}`), '', 3000);
        throw new Error(error.error);
      })
    )
  }

  updateRecipe(recipeDtoOut: RecipeDtoOut, recipeId: string) {
    let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.updateUserRecipe}`
    url = url.replace(":recipeId", recipeId);
    const recipeOut: Partial<RecipeDtoOut> = { ...recipeDtoOut };
    // let's save some space
    delete recipeOut.ingredients;
    delete recipeOut.steps;
    return this.httpClient.patch(url, recipeOut);
  }

  //NOTE - sarebbe stato intelligente avere un endpoint generico al posto di uno specializzato, shit happens
  updateIngredients(ingredientsOut: ingredientDtoOut[], recipeId: string) {
    const calls: Observable<any>[] = []
    ingredientsOut.forEach(ingredient => {
      //PATCH
      if (ingredient._id) {
        let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.updateUserRecipeIngredient}`
        url = url.replace(":recipeId", recipeId).replace(":ingredientId", ingredient._id);
        const call = this.httpClient.patch(url, ingredient);
        calls.push(call);
      } else {
        //ADD
        let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.addUserRecipeIngredient}`
        url = url.replace(":recipeId", recipeId);
        const call = this.httpClient.post(url, ingredient);
        calls.push(call);
      }
    })
    return calls;
  }
  //NOTE - sarebbe stato intelligente avere un endpoint generico al posto di uno specializzato, shit happens 2
  updateSteps(stepsOut: stepDtoOut[], recipeId: string) {
    const calls: Observable<any>[] = []
    stepsOut.forEach(step => {
      //PATCH
      if (step._id) {
        let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.updateUserRecipeStep}`
        url = url.replace(":recipeId", recipeId).replace(":stepId", step._id);
        const call = this.httpClient.patch(url, step);
        calls.push(call);
      } else {
        //ADD
        let url = `${environment.providerUrl}/${environment.endpoints.recipes.controller}/${environment.endpoints.recipes.addUserRecipeStep}`
        url = url.replace(":recipeId", recipeId);
        const call = this.httpClient.post(url, step);
        calls.push(call);
      }
    })
    return calls;
  }
}
