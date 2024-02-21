import { Component, Input } from '@angular/core';
import { toastType } from '../../../models/enums/toastType.enum';

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
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  @Input() type: "info" | "success" | "error" = toastType.Info;
  @Input() title: string = "ND";
  @Input() description: string = "ND";
}
