import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    //TODO - put auth guard
    path: 'user',
    pathMatch: 'full',
    redirectTo: 'user/own', 
  },
  {
    path: 'user/own',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [authGuard]
  }
  // {
  //   path: 'user/:userId',
  //   component: UserIdComponent
  // }
];
