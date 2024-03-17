import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { authGuard } from '../guards/auth.guard';
import { RecipeViewComponent } from '../pages/recipe/view/recipe-view/recipe-view.component';
import { RecipeEditComponent } from '../pages/recipe/edit/recipe-edit/recipe-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/own',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [authGuard]
  },
  {
    path: 'recipe/:userId/:recipeId/view',
    component: RecipeViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'recipe/editor',
    component: RecipeEditComponent,
    canActivate: [authGuard],
    pathMatch: 'full'
  },
  // {
  //   path: 'user/:userId',
  //   component: UserIdComponent
  // }
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full'
  },
];
