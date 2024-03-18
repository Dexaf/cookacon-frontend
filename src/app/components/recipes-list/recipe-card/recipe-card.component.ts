import { Component, Input, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IconsModule } from '../../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Recipe } from '../../../models/interfaces/recipe.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    IconsModule,
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss', '../../../../styles.scss']
})
export class RecipeCardComponent {
  router = inject(Router);
  store = inject(Store);
  @Input() recipe!: Recipe;
  @Input() canModify: boolean = false;

  providerUrl = environment.providerUrl;

  viewRecipe() {
    this.router.navigate(['recipe/:userId/:recipeId/view'.replace(':recipeId', this.recipe._id).replace(':userId', this.recipe.userId._id)]);
  }

  modifyRecipe() {
    localStorage.setItem("currentRecipe", JSON.stringify(this.recipe));
    this.router
    .navigate(['recipe/editor'], {
      queryParams: {
        edit: true,
        recipeId: this.recipe._id
      }
    });
  }
}
