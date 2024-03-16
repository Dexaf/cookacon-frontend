import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecipesService } from '../../../../services/recipes.service';
import { Recipe } from '../../../../models/interfaces/recipe.interface';
import { catchError, finalize, take } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IconsModule } from '../../../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { IslandToolbarComponent } from '../../../../components/island-toolbar/island-toolbar.component';
import { LoadingSpinnerComponent } from "../../../../components/loading-spinner/loading-spinner.component";
import { toolbarFunction } from '../../../../models/interfaces/toolbar-function.interface';
import { ModalWrapperComponent } from '../../../../components/modal-wrapper/modal-wrapper.component';
import { ShareLinkComponent } from '../../../../components/share-link/share-link.component';
import { Store } from '@ngrx/store';
import { AppState } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
  imports: [
    IconsModule,
    ShareLinkComponent,
    CommonModule,
    TranslocoModule,
    IslandToolbarComponent,
    LoadingSpinnerComponent,
    ModalWrapperComponent,
    RouterModule
  ]
})
export class RecipeViewComponent implements OnInit {
  activeRoute = inject(ActivatedRoute);
  store = inject(Store<AppState>);
  recipesService = inject(RecipesService);
  router = inject(Router);

  recipe: Recipe | null = null;
  errorOnGet: boolean | null = null;
  isLoadingRecipe: boolean = false;
  toolbarFunctions: toolbarFunction[] = [
    {
      iconName: "share-2",
      eventName: "share"
    }
  ];
  isShareModalOpened = false;
  currentUrl = window.location.href;
  providerUrl = environment.providerUrl;
  loggedUserId: string | null = null;

  ngOnInit() {
    this.isLoadingRecipe = true;

    this.store.select(getUserData$).subscribe(userData => {
      this.loggedUserId = userData.id;
    });

    this.activeRoute.params.subscribe(params => {
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
            if (this.recipe.userId._id === this.loggedUserId)
              this.toolbarFunctions = [
                ...this.toolbarFunctions,
                {
                  iconName: "edit",
                  eventName: "edit"
                }
              ]
          })
    });
  }

  eventHandler(eventName: string) {
    switch (eventName) {
      case "share":
        this.isShareModalOpened = true
        break;
      case "edit":
        this.activeRoute.params
        .pipe(take(1))
        .subscribe(params => {
          this.router.navigate(['/recipe', params["userId"], params["recipeId"], 'edit'])
        })
        break;
    }
  }
}
