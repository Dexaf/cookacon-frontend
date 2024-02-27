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
    path: 'user/own',
    pathMatch: 'full',
    component: UserProfileComponent,
    canActivate: [authGuard]
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
