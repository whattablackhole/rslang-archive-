import {
  Component, Input, Output, EventEmitter,
} from '@angular/core';

import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss'],
})
export class WordItem {
  @Input() item: Word;
  @Output() wordDifficult: EventEmitter<string> = new EventEmitter<string>();
  @Output() wordRemove: EventEmitter<string> = new EventEmitter<string>();

  turnOverItem(): string {
    return 'turnOver';
  }

  addToRemove(wordId: string): void {
    this.wordRemove.emit(wordId);
  }

  addToDifficult(wordId: string): void {
    this.wordDifficult.emit(wordId);
  }

  playSound(sound: string): Promise<void> {
    return (new Audio(sound)).play();
  }
}
