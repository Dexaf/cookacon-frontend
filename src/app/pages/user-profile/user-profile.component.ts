import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';
import { UserDataProfileCardComponent } from './components/user-data-profile-card/user-data-profile-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserDataProfileCardComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  store = inject(Store<AppState>);
  userData: UserData | null = null;
  userDataProfile: string = "assets/images/default_picture.png";

  ngOnInit(): void {
    this.store.select(getUserData$)
      .subscribe(_userData => {
        this.userData = _userData;
        this.userDataProfile = _userData.profilePictureUrl ? _userData.profilePictureUrl : "assets/images/default_picture.png";
      })
  }
}
