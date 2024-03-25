import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RecipeEditorComponent } from '../../../../components/recipe-editor/recipe-editor.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../../../models/interfaces/recipe.interface';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';
import { RecipesService } from '../../../../services/recipes.service';
import { LoadingSpinnerComponent } from '../../../../components/loading-spinner/loading-spinner.component';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [RecipeEditorComponent, LoadingSpinnerComponent],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  formGroup = inject(FormBuilder);
  activedRoute = inject(ActivatedRoute);
  store = inject(Store<AppState>);
  recipesService = inject(RecipesService);
  router = inject(Router);

  subscriptions: Subscription[] = [];

  isEditing: boolean = false;
  recipe: Recipe | null = null;
  userId: string | null = null;
  recipeId: string | null = null;

  isLoadingEditorState: boolean = false;


  ngOnInit(): void {
    const storeSub = this.store.select(getUserData$)
      .pipe(filter(user => user.id !== null))
      .subscribe(user => {
        this.userId = user.id;
        const queryParamSub = this.loadParamRoutine()
        this.subscriptions.push(queryParamSub);
      })

    this.subscriptions.push(storeSub);
  }

  loadParamRoutine() {
    return this.activedRoute.queryParams.subscribe(qp => {
      this.isLoadingEditorState = true;
      this.recipeId = qp["recipeId"];

      if (this.recipeId && qp["edit"] === "true") {
        this.isEditing = true;
        this.loadEditData(this.recipeId, this.userId!);
      }
      else if (qp["add"] === "true") {
        this.isEditing = false;
        this.isLoadingEditorState = false;
      }
      else {
        this.router.navigate([],
          {
            relativeTo: this.activedRoute,
            queryParams: { add: 'true' },
            queryParamsHandling: 'merge'
          });
      }
    })
  }

  loadEditData(recipeId: string, userId: string) {
    let recipe = localStorage.getItem("currentRecipe");
    if (recipe) {
      const parsedRecipe = JSON.parse(recipe) as Recipe;
      if (parsedRecipe._id === recipeId) {
        this.recipe = parsedRecipe
        this.isLoadingEditorState = false;
        return;
      } else {
        const getRecipeSub = this.recipesService.getRecipe(userId, recipeId)
          .subscribe(r => {
            this.recipe = r;
            this.isLoadingEditorState = false;
          })

        this.subscriptions.push(getRecipeSub);
      }
    } else {
      const getRecipeSub = this.recipesService.getRecipe(userId, recipeId)
        .subscribe(r => {
          this.recipe = r;
          this.isLoadingEditorState = false;
        })

      this.subscriptions.push(getRecipeSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}
