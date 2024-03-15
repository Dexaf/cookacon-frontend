import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../icons.module';
import { toolbarFunction } from '../../models/interfaces/toolbar-function.interface';

@Component({
  selector: 'app-island-toolbar',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './island-toolbar.component.html',
  styleUrls: ['./island-toolbar.component.scss', '../../../styles.scss']
})
export class IslandToolbarComponent {
  @Input() functions: toolbarFunction[] = [];
  @Output() event: EventEmitter<string> = new EventEmitter();

  isOpen = true;

  toggleIslandMenu() {
    this.isOpen = !this.isOpen
  }

  emitFunctionEvent(eventName: string) {
    //TODO handle event
    this.event.emit(eventName);
  }
}
