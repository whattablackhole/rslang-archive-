import { Component, Input } from '@angular/core';

import { Word } from '../../../shared/models/word.model';

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss'],
})
export class WordItem {
  @Input() item: Word;

  turnOverItem(): string {
    return 'turnOver';
  }

  addToRemove(id: string): string {
    return id;
  }

  addToDifficult(id: string): string {
    return id;
  }

  playSound(sound: string): Promise<void> {
    return (new Audio(sound)).play();
  }
}
