import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';

import { ActionParams } from '../../models/action-params.model';
import { OptionsChecked } from '../../models/options-checked.model';
import { ButtonAction } from '../../../shared/types/button-action.type';
import { WordOptions } from '../../models/word-options.model';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss'],
})
export class WordItem {
  @Input() optionsChecked: OptionsChecked;
  @Input() item: WordOptions;
  @Input() ebook: boolean;
  @Output() setAction: EventEmitter<ActionParams> = new EventEmitter<ActionParams>();
  @Output() setRestore: EventEmitter<string> = new EventEmitter<string>();
  action: ButtonAction;

  turnOverItem(): string {
    return 'turnOver';
  }

  changeAction(action: ButtonAction, wordId: string): void {
    if (this.action === action) {
      this.action = 'unset';
    } else { this.action = action; }
    this.setAction.emit({ action, wordId });
  }

  changeRestore(wordId: string): void {
    this.setRestore.emit(wordId);
  }

  playSound(sound: string): Promise<void> {
    return (new Audio(sound)).play();
  }
}
