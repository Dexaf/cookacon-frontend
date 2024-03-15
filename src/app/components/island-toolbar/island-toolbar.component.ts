import { Component } from '@angular/core';
import { IconsModule } from '../../icons.module';

@Component({
  selector: 'app-island-toolbar',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './island-toolbar.component.html',
  styleUrls: ['./island-toolbar.component.scss', '../../../styles.scss']
})
export class IslandToolbarComponent {
  isOpen = true;

  toggleIslandMenu() {
    this.isOpen = !this.isOpen
  }
}
