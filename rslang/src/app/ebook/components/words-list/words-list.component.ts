import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { WORDS_API_URL } from '../../../shared/constants/constants';
import { ActionParams } from '../../models/action-params.model';
import { Word } from '../../../shared/models/word.model';
import { UsersWords } from '../../../shared/models/users-words.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model';
import { OptionsChecked } from '../../models/options-checked.model';
import { EbookSettingsService } from '../../services/ebook-settings.service';
import { WordOptions } from '../../models/word-options.model';
import { WordsDataService } from '../../../shared/services/words-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserWordActionService } from '../../../shared/services/user-word-action.service';
import { CurrentStateBook } from '../../models/current-state-book.model';
import { EbookProviderService } from '../../services/ebook-provider.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  set subscription(sb: Subscription) { this.subscriptions.push(sb); }

  userBookSettings: UserBookSettings;
  optionsChecked: OptionsChecked = {};
  state: CurrentStateBook;
  words: WordOptions[] = [];
  userWords: UsersWords[] = [];
  isUserAuthenticated = false;
  title = 'study words';

  constructor(
    private router: Router,
    private location: Location,
    private wordsDataService: WordsDataService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private userWordActionService: UserWordActionService,
    private ebookSettings: EbookSettingsService,
    private providerService: EbookProviderService,
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getUserAuthenticationStatus();
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    console.log(this.userBookSettings);
    this.subscription = this.localStorageService.changes$
      .subscribe(
        (events: StorageChanges) => {
          if (events.type === LocalStorageType.Set && events.key === LocalStorageKey.EbookSettings as string) {
            this.userBookSettings = JSON.parse(events.value as string) as UserBookSettings;
          }
        },
      );

    this.setOptionCheckedSettings(this.userBookSettings);

    const { currentState } = this.userBookSettings;
    this.state = currentState;
    this.wordsDataService.getWords(currentState);
    this.subscription = this.wordsDataService.data$
      .subscribe((words: WordOptions[]) => this.mapWords(words));
  }

  setOptionCheckedSettings(userBookSettings: UserBookSettings): void {
    const { buttonOptions, wordOptions } = userBookSettings;
    buttonOptions.forEach((element) => {
      this.optionsChecked[element.value] = element.checked as boolean;
    });
    wordOptions.forEach((element) => {
      this.optionsChecked[element.value] = element.checked as boolean;
    });
    this.providerService.updatedOptionSettings(this.optionsChecked);
  }

  changeSelectedGroup(groupChanged: number): void {
    const { page } = this.userBookSettings.currentState;
    const path = this
      .router
      .createUrlTree(['ebook/group', groupChanged, 'page', page])
      .toString();
    this.location.go(path);

    this.userBookSettings.currentState.group = groupChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    const { currentState } = this.userBookSettings;
    this.state = currentState;
    if (this.isNotPageWasViewed(this.state)) {
      this.wordsDataService.getWords(currentState);
    }
  }

  changeSelectedPage(pageChanged: number): void {
    const { group } = this.userBookSettings.currentState;
    const path = this
      .router
      .createUrlTree(['ebook/group', group, 'page', pageChanged])
      .toString();
    this.location.go(path);

    this.userBookSettings.currentState.page = pageChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    this.ebookSettings.setUserSettings();
    const { currentState } = this.userBookSettings;
    this.state = currentState;
    if (this.isNotPageWasViewed(this.state)) {
      this.wordsDataService.getWords(currentState);
    }
  }

  setActionForWord(params: ActionParams): void {
    const group = String(this.words[this.words.findIndex((element: Word) => element.id === params.wordId)].group);
    const page = String(this.words[this.words.findIndex((element: Word) => element.id === params.wordId)].page);

    const userId = this.isUserAuthenticated
      ? this.authService.getUserId()
      : 'unauthenticated';

    const index = this.userWords.findIndex((element: UsersWords) => element.wordId === params.wordId);
    if (index === -1) {
      this.userWords.push({
        id: userId as string,
        wordId: params.wordId,
        difficulty: params.action,
        optional: { group, page },
      });
      if (this.isUserAuthenticated) {
        this.userWordActionService.createUserWord(
          userId as string,
          params.wordId,
          {
            difficulty: params.action,
            optional: { group, page },
          },
        );
      }
    } else {
      this.userWords[index].difficulty = params.action;
      if (this.isUserAuthenticated) {
        this.userWordActionService.updateUserWord(
          userId as string,
          params.wordId,
          {
            difficulty: params.action,
            optional: { group, page },
          },
        );
      }
    }

    this.localStorageService
      .setItem(LocalStorageKey.WordsdUser, JSON.stringify(this.userWords));
    this.providerService.updatedUserWords(this.userWords);
  }

  // indexWord<T>(arr: T[], index: string, value: string): number {
  //   return arr.findIndex((element) => element[index] === value);
  // }

  private mapWords(words: WordOptions[]): void {
    words.forEach((wordData) => {
      const word = { ...wordData };
      word.image = WORDS_API_URL + word.image;
      word.audio = WORDS_API_URL + word.audio;
      word.audioMeaning = WORDS_API_URL + word.audioMeaning;
      word.audioExample = WORDS_API_URL + word.audioExample;
      this.words.push(word);
    });
    this.providerService.updatedDataViewsWords(this.words);
  }

  private isNotPageWasViewed(state: CurrentStateBook): boolean {
    return !!this.words.findIndex((el: WordOptions) => el.group === state.group - 1 && el.page === state.page - 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }
}
