import { Component, HostListener, Input, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, UserData } from '@store/interfaces';
import { getUserData$ } from '@store/selectors';
import { environment } from '../../../environments/environment';
import { TABLET_WIDTH } from '../../models/constants/constants';
import { CollapsedTextComponent } from '../collapsed-text/collapsed-text.component';
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
  @Input() userData!: UserData;
  userDataProfile: string = "assets/images/default_picture.png";
  areWeInMobile = false;

  ngOnInit(): void {
    if (this.userData.profilePictureUrl)
      this.userDataProfile = environment.providerUrl + this.userData.profilePictureUrl;
    else
      this.userDataProfile = "assets/images/default_picture.png";

    this.areWeInMobile = window.innerWidth <= TABLET_WIDTH
  }

  @HostListener('window:resize')
  onResize() {
    this.areWeInMobile = window.innerWidth <= TABLET_WIDTH
  }
}
