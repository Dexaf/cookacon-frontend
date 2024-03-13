import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';
import { environment } from '../../../../../environments/environment';
import { MOBILE_WIDTH } from '../../../../models/constants/constants';
import { CollapsedTextComponent } from '../../../../components/collapsed-text/collapsed-text.component';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-user-data-profile-card',
  standalone: true,
  templateUrl: './user-data-profile-card.component.html',
  styleUrl: './user-data-profile-card.component.scss',
  imports: [
    CollapsedTextComponent,
    TranslocoModule
  ]
})
export class UserDataProfileCardComponent implements OnInit {
  store = inject(Store<AppState>);
  userData: UserData | null = null;
  userDataProfile: string = "assets/images/default_picture.png";
  areWeInMobile = false;

  ngOnInit(): void {
    this.store.select(getUserData$)
      .subscribe(_userData => {
        this.userData = _userData;
        if (_userData.profilePictureUrl)
            this.userDataProfile = environment.providerUrl + _userData.profilePictureUrl;
        else
          this.userDataProfile = "assets/images/default_picture.png";
      })

    this.areWeInMobile = window.innerWidth <= MOBILE_WIDTH
  }

  @HostListener('window:resize')
  onResize() {
    this.areWeInMobile = window.innerWidth <= MOBILE_WIDTH
  }
}
