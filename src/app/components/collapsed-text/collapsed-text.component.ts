import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../icons.module';

@Component({
  selector: 'app-collapsed-text',
  standalone: true,
  imports: [
    IconsModule
  ],
  template: `
    <ng-container>
      @if(this.isTextCollapsed && this.text.length > 30) {
        {{this.text.substring(0, 30)}}...
        <section class="collapsed-text-container" (click)="toggleCollapse()">
          <span>
            {{this.collapsedText}}
          </span>
          <i-feather name="chevron-down" class="sm-icon stroke-second"></i-feather>
        </section>
      } @else {
        {{this.text}}
        <section class="collapsed-text-container" (click)="toggleCollapse()">
          <i-feather name="chevron-up" class="sm-icon stroke-second"></i-feather>
          <span>
            {{this.uncollapsedText}}
          </span>
        </section>
      }
    </ng-container>
  `,
  styleUrls: ['./collapsed-text.component.scss', '../../../styles.scss']
})
export class CollapsedTextComponent {
  @Input() isTextCollapsed = false;
  @Input() text = "";
  @Input() collapsedText = "";
  @Input() uncollapsedText = "";
  @Output() toggleCollapsing = new EventEmitter();

  toggleCollapse() {
    this.toggleCollapsing.emit(!this.isTextCollapsed);
  }
}
