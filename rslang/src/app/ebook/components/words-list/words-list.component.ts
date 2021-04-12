import {
  Component, Output, EventEmitter, OnInit, OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Word } from '../../../shared/models/word.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';
import { CurrentStateBook } from '../../models/current-state-book.model';
import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  set subscription(sb: Subscription) { this.subscriptions.push(sb); }

  userBookSettings: UserBookSettings;
  words: Word[];
  @Output() pageNoChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private wordsDataService: WordsDataService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.subscription = this.localStorageService.changes$
      .subscribe(
        (events: StorageChanges) => {
          if (events.type === LocalStorageType.Set && events.key === LocalStorageKey.EbookSettings as string) {
            this.userBookSettings = JSON.parse(events.value as string) as UserBookSettings;
          }
        },
      );

    this.subscription = this.route.params.subscribe((params): void => {
      this.userBookSettings.currentState.group = params.id as number;
    });
    const { currentState } = this.userBookSettings;
    this.getWordsList(currentState);
  }

  changeSelectedPage(pageNoChanged: number): void {
    this.userBookSettings.currentState.page = pageNoChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    const { currentState } = this.userBookSettings;
    this.getWordsList(currentState);
  }

  changeRemoveWord(wordRemove: string): void {
    console.log(this.words[this.indexWord(wordRemove)]);
  }

  changeDifficultWord(wordDifficult: string): void {
    console.log(this.words[this.indexWord(wordDifficult)]);
  }

  indexWord(wordId: string): number {
    return this.words.findIndex((element: Word) => element.id === wordId);
  }

  getWordsList(currentState: CurrentStateBook): void {
    this.words = this.wordsDataService.GetWords(currentState);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
