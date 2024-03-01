import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';

@Component({
  selector: 'app-user-data-profile-card',
  standalone: true,
  templateUrl: './user-data-profile-card.component.html',
  styleUrl: './user-data-profile-card.component.scss'
})
export class UserDataProfileCardComponent implements OnInit {
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
