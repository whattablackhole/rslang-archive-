import {
  animate, keyframes, state, style, transition, trigger,
} from '@angular/animations';
import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { CardData } from '../../models/card-data.model';

@Component({
  selector: 'app-word-card',
  templateUrl: './word-card.component.html',
  styleUrls: ['./word-card.component.scss'],
  animations: [
    trigger('cardAnimation', [
      state('default', style({
        transform: 'none',
      })),
      state('selected', style({
        opacity: 0.5,
      })),
      state('matched', style({
        background: 'green',
        cursor: 'auto',
        transform: 'scale(0.9)',
        opacity: 0,
      })),
      transition('default => selected', [
        animate('100ms'),
      ]),
      transition('selected => default', [
        animate('200ms'),
      ]),
      transition('* => matched', [
        animate('700ms'),
      ]),
      transition('selected <=> error',
        animate('1.2s ease-out', keyframes([
          style({ transform: 'translate3d(-2px, 0, 0)', offset: 0.1, background: 'red' }),
          style({ transform: 'translate3d(3px, 0, 0)', offset: 0.2, background: 'red' }),
          style({ transform: 'translate3d(-5px, 0, 0)', offset: 0.3, background: 'red' }),
          style({ transform: 'translate3d(5px, 0, 0)', offset: 0.4, background: 'red' }),
          style({ transform: 'translate3d(-5px, 0, 0)', offset: 0.5, background: 'red' }),
          style({ transform: 'translate3d(5px, 0, 0)', offset: 0.6, background: 'red' }),
          style({ transform: 'translate3d(-5px, 0, 0)', offset: 0.7, background: 'red' }),
          style({ transform: 'translate3d(3px, 0, 0)', offset: 0.8, background: 'red' }),
          style({ transform: 'translate3d(-2px, 0, 0)', offset: 0.9, background: 'red' }),
        ]))),
    ]),
  ],
})
export class WordCard {
  @Input() data: CardData;
  @Output() cardClicked = new EventEmitter();
}
