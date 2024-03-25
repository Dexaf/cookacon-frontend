import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconsModule } from '../../icons.module';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [IconsModule],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss', '../../../styles.scss']
})
export class InfoCardComponent implements OnInit, AfterViewInit {
  @Input() image?: string;
  @Input() title?: string;
  @Input() description?: string;
  @Input() isHorizontal: boolean = true;
  @Input({ required: true }) prefix!: string;
  @Input() payload?: string;
  @Input() actions: cardAction[] = [{ iconName: "test", eventName: "test" }];
  @Output() onEvent: EventEmitter<cardEvent> = new EventEmitter();

  showActions = false;
  cardId = "";

  ngOnInit(): void {
    this.cardId = this.prefix + (this.payload ? '-' + this.payload : '')
  }

  ngAfterViewInit(): void {
    document.getElementById(this.cardId)?.addEventListener("mouseover", () => {
      this.showActions = true;
    })
    document.getElementById(this.cardId)?.addEventListener("mouseleave", () => {
      this.showActions = false;
    })
  }

  emitEvent(eventName: string) {
    const currentAction = this.actions.find(a => a.eventName === eventName);
    if (!currentAction)
      throw new Error("no action found in info card " + this.cardId);
    if (currentAction.hasPayload)
      this.onEvent.emit({ eventName, payload: this.payload });
    else
      this.onEvent.emit({ eventName });
  }
}

export interface cardAction {
  iconName: string,
  eventName: string,
  hasPayload?: boolean
}

export interface cardEvent {
  eventName: string; 
  payload?: string | number
}