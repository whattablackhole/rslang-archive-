import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { WORDS_API_URL } from '../../../shared/constants/constants';
import { ActionParams } from '../../models/action-params.model';
import { Word } from '../../../shared/models/word.model';
import { UserStats } from '../../../shared/models/user-stats.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';
import { WordAndStatistics } from '../../../shared/models/word-statistics.model';
import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  set subscription(sb: Subscription) { this.subscriptions.push(sb); }

  userBookSettings: UserBookSettings;
  words: WordAndStatistics[] = [];
  userWords: UserStats[] = [];
  isUserAuthenticated = this.authService.getIsUserAuthenticated();

  constructor(
    private route: ActivatedRoute,
    private wordsDataService: WordsDataService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
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
    this.wordsDataService.getWords(currentState);
    this.subscription = this.wordsDataService.data$
      .subscribe((words: Word[]) => this.mapWords(words));
  }

  changeSelectedPage(pageChanged: number): void {
    this.userBookSettings.currentState.page = pageChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    const { currentState } = this.userBookSettings;
    this.wordsDataService.getWords(currentState);
  }

  setActionForWord(params: ActionParams): void {
    // const group = String(this.words[this.indexWord(this.words, 'id', params.wordId)].group);
    // const page = String(this.words[this.indexWord(this.words, 'id', params.wordId)].page);
    const group = String(this.words[this.words.findIndex((element: Word) => element.id === params.wordId)].group);
    const page = String(this.words[this.words.findIndex((element: Word) => element.id === params.wordId)].page);

    const userId = this.isUserAuthenticated
      ? this.authService.getUserId()
      : 'unauthenticated';

    const index = this.userWords.findIndex((element: UserStats) => element.wordId === params.wordId);
    if (index === -1) {
      this.userWords.push({
        id: userId as string,
        wordId: params.wordId,
        difficulty: params.action,
        optional: { group, page },
      });
    } else {
      this.userWords[index].difficulty = params.action;
    }

    this.localStorageService
      .setItem(LocalStorageKey.WordsdUser, JSON.stringify(this.userWords));

    if (this.isUserAuthenticated) {
      console.log(this.isUserAuthenticated);
    }
  }

  // indexWord<T>(arr: T[], index: string, value: string): number {
  //   return arr.findIndex((element) => element[index] === value);
  // }

  private mapWords(words: Word[]): void {
    this.words = [];
    words.forEach((wordData) => {
      const word = { ...wordData };
      word.image = WORDS_API_URL + word.image;
      word.audio = WORDS_API_URL + word.audio;
      word.audioMeaning = WORDS_API_URL + word.audioMeaning;
      word.audioExample = WORDS_API_URL + word.audioExample;
      this.words.push(word);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
