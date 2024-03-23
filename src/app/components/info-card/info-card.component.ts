import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [],
  template: `
    <section [class]="'card ' + (isHorizontal ? 'horizontal' : 'vertical')">
      @if(image) {
        <img [src]="image">
      }
      <div>
      @if(title) {
        <h5 class="m-0">
          {{title}}
        </h5>
      } 
      @if(description) {
        <p class="m-0">
          {{description}}
        </p>
      } 
      </div>
    </section>
  `,
  styleUrls: ['./info-card.component.scss', '../../../styles.scss']
})
export class InfoCardComponent {
  @Input() image?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() isHorizontal: boolean = true;

}
