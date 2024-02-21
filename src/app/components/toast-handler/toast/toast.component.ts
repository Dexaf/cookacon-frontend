import { Component, Input } from '@angular/core';
import { toastType } from '../../../models/enums/toastType.enum';
import { animate, state, style, transition, trigger } from '@angular/animations';

//TODO - fix animations
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
    <div [class]="type + ' toast'">
      <h5 class="m-0">{{title}}</h5>
      <p class="m-0" [innerHTML]="description"></p>
    </div>
  `,
  styleUrl: './toast.component.scss',
  animations: [
    trigger(
      "visibleHidden",
      [
        state(
          'visible',
          style({
            transform: 'translate(-50%,0%) scale(1)',
            opacity: 1
          })
        ),
        state(
          'void, hidden',
          style({
            transform: 'translate(-50%,0%) scale(0.8)',
            opacity: 0
          })
        ),
        transition('* => visible', animate('500ms')),
        transition('* => void', animate('250ms'))
      ]
    )
  ]
})
export class ToastComponent {
  @Input() type: "info" | "success" | "error" = toastType.Info;
  @Input() title: string = "ND";
  @Input() description: string = "ND";
}
