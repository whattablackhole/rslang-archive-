import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersWordsDataService } from '../../services/users-words-data.service';
import { AuthService } from '../../../auth/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LocalStorageKey } from '../../../shared/models/local-storage-keys.model';
import { UserBookSettings } from '../../models/user-book-settings.model';
import { WordsCollection } from '../../models/words-collection.model';
import { UsersWords } from '../../../shared/models/users-words.model';
import { CONFIG_EBOOK } from '../../constants/config-ebook';

@Component({
  selector: 'app-words-collections',
  templateUrl: './words-collections.component.html',
  styleUrls: ['./words-collections.component.scss'],
})
export class WordsCollections implements OnInit, OnDestroy {
  wordsCollections: WordsCollection[] = CONFIG_EBOOK.collections;
  allWordssubscriptions: Subscription;
  allUsersWords: UsersWords[];
  userBookSettings: UserBookSettings;
  isUserAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private usersWordsDataService: UsersWordsDataService,
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getUserAuthenticationStatus();
    const userId = this.isUserAuthenticated
      ? this.authService.getUserId()
      : 'unauthenticated';

    if (this.isUserAuthenticated) {
      this.usersWordsDataService.getAllUsersWords(userId as string);
      this.allWordssubscriptions = this.usersWordsDataService.data$
        .subscribe((words: UsersWords[]) => {
          this.allUsersWords = words;
        });
    }
  }

  changeSelectedGroup(collection: WordsCollection): Promise<boolean> {
    const data = this.localStorageService.getItem(LocalStorageKey.EbookSettings);
    this.userBookSettings = JSON.parse(data as string) as UserBookSettings;
    this.userBookSettings.currentState.group = collection.id + 1;
    this.localStorageService
      .setItem(LocalStorageKey.EbookSettings, JSON.stringify(this.userBookSettings));
    // TODO for authenticated
    const page = 0;
    const path = this
      .router
      .createUrlTree([collection.id + 1, 'page', page + 1], { relativeTo: this.route })
      .toString();
    return this.router.navigate([path]);
  }

  getProgress(i: number): string {
    return `${(100 * (1 - (this.wordsCollections[i].progress / this.wordsCollections[i].words))).toFixed(0)}%`;
  }

  ngOnDestroy(): void {
    if (this.isUserAuthenticated) {
      this.allWordssubscriptions.unsubscribe();
    }
  }
}
