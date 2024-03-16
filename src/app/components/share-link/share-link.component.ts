import { Component, Input, OnInit, inject } from '@angular/core';
import { IconsModule } from '../../icons.module';
import { ToastService } from '../../services/toast.service';
import { toastType } from '../../models/enums/toastType.enum';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-share-link',
  standalone: true,
  imports: [IconsModule],
  template: `
  <div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/it_IT/sdk.js#xfbml=1&version=v19.0" nonce="W8ZJ42qK">
  </script>
  <div class="flex-center-container" style="justify-content: space-between;" body>
    <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="" data-size="">
      <a target="_blank" [href]="'https://www.facebook.com/sharer/sharer.php?u=' + this.encodedUrl" class="fb-xfbml-parse-ignore">
        <i-feather style="stroke: #0571E6;" name="facebook" class="animated lg-icon"></i-feather>
      </a>
    </div>
    <img src="../../../assets/images/x-social-media-logo-icon.svg" style="width: 4rem; height: 4rem;" class="animated" (click)="share('x')">
    <img src="../../../assets/images/whats-app-logo-icon.svg" style="width: 4rem; height: 4rem;" class="animated" (click)="share('wa')">
    <i-feather name="copy" class="lg-icon animated" (click)="share('copy')"></i-feather>  
  </div>
  `,
  styleUrls: ['./share-link.component.scss', '../../../styles.scss']
})
export class ShareLinkComponent implements OnInit{
  @Input() sharedLink = "";
  toastService = inject(ToastService);
  translocoService = inject(TranslocoService);
  encodedUrl: string = "";

  ngOnInit(): void {
    this.encodedUrl = encodeURIComponent(this.sharedLink)
  }

  share(typeOfShare: string) {
    switch (typeOfShare) {
      case "fb":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${this.encodedUrl}`, "_blank");
        break;
      case "x":
        window.open(`https://twitter.com/intent/tweet?text=${this.encodedUrl}`, "_blank");
        break;
      case "wa":
        window.open(`whatsapp://send?text=${this.encodedUrl}`, "_blank");
        break;
      case "copy":
        navigator.clipboard.writeText(this.sharedLink);
        this.toastService.makeToast(toastType.Info, this.translocoService.translate("generics.copied"), "", 1000)
        break;
    }
  }
}
