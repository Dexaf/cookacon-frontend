import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="spinner-container">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5">
        </circle>
      </svg>
    </div>
  `,
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {

}
