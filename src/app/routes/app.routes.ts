import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    //TODO - put auth guard
    path: 'user',
    redirectTo: 'user/own', 
    pathMatch: 'full'
  },
  {
    path: 'user/own',
    component: UserProfileComponent,
    pathMatch: 'full'
  }
  // {
  //   path: 'user/:userId',
  //   component: UserIdComponent
  // }
];
