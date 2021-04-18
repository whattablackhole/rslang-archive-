import {
  Component, OnInit, OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UsersWords } from 'src/app/shared/models/user-stats.model';
import { UsersWordsDataService } from '../../services/users-words-data.service';
import { AuthService } from '../../../auth/services/auth.service';
import { WordsCollection } from '../../models/words-collection.model';
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
  isUserAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private usersWordsDataService: UsersWordsDataService,
  ) {}

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.getUserAuthenticationStatus();
    const userId = this.isUserAuthenticated
      ? this.authService.getUserId()
      : 'unauthenticated';

    this.usersWordsDataService.getAllUsersWords(userId as string);
    this.allWordssubscriptions = this.usersWordsDataService.data$
      .subscribe((words: UsersWords[]) => {
        this.allUsersWords = words;
        console.log(this.allUsersWords);
      });
  }

  changeSelectedGroup(collection: WordsCollection): Promise<boolean> {
    const path = this
      .router
      .createUrlTree([collection.id + 1, 'page', 1], { relativeTo: this.route })
      .toString();
    return this.router.navigate([path]);
  }

  getProgress(i: number): string {
    return `${(100 * (1 - (this.wordsCollections[i].progress / this.wordsCollections[i].words))).toFixed(0)}%`;
  }

  ngOnDestroy(): void {
    this.allWordssubscriptions.unsubscribe();
  }
}
