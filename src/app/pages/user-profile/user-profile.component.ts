import { Component, OnInit, inject } from '@angular/core';
import { UserDataProfileCardComponent } from '../../components/user-data-profile-card/user-data-profile-card.component';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';

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
export class UserProfileComponent implements OnInit {
  store = inject(Store<AppState>)
  ownProfile: UserData | null = null;

  ngOnInit(): void {
    this.store
      .select(getUserData$)
      .subscribe(_userData => {
        this.ownProfile = _userData;
      })

  }
}
