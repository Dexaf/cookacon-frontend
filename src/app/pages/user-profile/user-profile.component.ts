import { Component, OnInit, inject } from '@angular/core';
import { UserDataProfileCardComponent } from './components/user-data-profile-card/user-data-profile-card.component';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserDataProfileCardComponent,
    RecipesListComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
}
