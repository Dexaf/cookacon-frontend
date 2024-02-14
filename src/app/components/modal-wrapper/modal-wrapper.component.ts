import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconsModule } from '../../icons.module';

@Component({
  selector: 'app-modal-wrapper',
  standalone: true,
  imports: [
    IconsModule
  ],
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss', '../../../styles.scss']
})
export class ModalWrapperComponent {

  @Input() modalSize: "lg" | "md" | "sm" = 'lg';
  @Input() hasFooter: boolean = false;
  @Output() onModalClose = new EventEmitter();

  closeModal() {
    this.onModalClose.emit();
  }
}
