import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../../../../services/recipes.service';
import { Recipe } from '../../../../models/interfaces/recipe.interface';
import { catchError, finalize } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IconsModule } from '../../../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [IconsModule, CommonModule, TranslocoModule],
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  recipesService = inject(RecipesService);
  recipe: Recipe | null = null;
  errorOnGet: boolean | null = null;
  isLoadingRecipe: boolean = false;
  providerUrl = environment.providerUrl;

  ngOnInit() {
    this.isLoadingRecipe = true;

    this.activeRoute.params
      .subscribe(params => {
        this.recipesService.getRecipe(params["userId"], params["recipeId"])
          .pipe(
            catchError((error) => {
              this.errorOnGet = true;
              throw new Error(error);
            }),
            finalize(() => this.isLoadingRecipe = false)
          )
          .subscribe(
            _recipe => {
              this.errorOnGet = false;
              this.recipe = _recipe;
            })
      });
  }
}
