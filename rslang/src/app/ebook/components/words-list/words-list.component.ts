import {
  Component, Output, EventEmitter, OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

import { Word } from '../../../shared/models/word.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { StorageChanges } from '../../../core/models/change-storage.model';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { LocalStorageType } from '../../../shared/models/change-storage-type.model'
import { CurrentStateBook } from '../../models/current-state-book.model';
import { EbookDataService } from '../../services/ebook-data.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  styleUrls: ['./words-list.component.scss'],
})
export class WordsList implements OnInit {
  private subscriptions: Subscription[] = [];
  set subscription(sb: Subscription) { this.subscriptions.push(sb); }
  ebookSettingsChanges$ = this.localStorageService.changes$;

  userBookSettings: UserBookSettings;
  words: Observable<Word[]>;
  @Output() pageNoChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private route: ActivatedRoute,
    private ebookDataService: EbookDataService,
    private localStorageService: LocalStorageService,
  ) {}

  ngOnInit(): void {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.subscription = this.ebookSettingsChanges$
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
  }

  changeSelectedPage(pageNoChanged: number): void {
    this.userBookSettings.currentState.page = pageNoChanged;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    const currentState = this.userBookSettings.currentState;
    this.getWordsList(currentState);
  }

  getWordsList(currentState: CurrentStateBook): void {
    this.ebookDataService.getWords(currentState);
  }
}
