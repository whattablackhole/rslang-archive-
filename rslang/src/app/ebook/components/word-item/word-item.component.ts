import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { ACTION_BUTTONS } from '../../constants/action-buttons';
import { Word } from '../../../shared/models/word.model';
import { ActionParams } from '../../models/action-params.model';
import { ButtonAction } from '../../../shared/types/button-action.type';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss'],
})
export class WordItem {
  @Input() item: Word;
  @Output() setAction: EventEmitter<ActionParams> = new EventEmitter<ActionParams>();
  ActionButtons: Array<string> = ACTION_BUTTONS;

  turnOverItem(): string {
    return 'turnOver';
  }

  changeAction(action: ButtonAction, wordId: string): void {
    this.setAction.emit({ action, wordId });
  }

  playSound(sound: string): Promise<void> {
    return (new Audio(sound)).play();
  }
}
