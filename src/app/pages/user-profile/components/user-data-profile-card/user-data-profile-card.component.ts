import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';
import { environment } from '../../../../../environments/environment';

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
        if (_userData.profilePictureUrl)
            this.userDataProfile = environment.providerUrl + _userData.profilePictureUrl;
        else
          this.userDataProfile = "assets/images/default_picture.png";
      })
  }
}
