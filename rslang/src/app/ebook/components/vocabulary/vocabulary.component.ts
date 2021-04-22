import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersWords } from 'src/app/shared/models/users-words.model';

import { OptionsChecked } from '../../models/options-checked.model';
import { UserBookSettings } from '../../models/user-book-settings.model';

import { WordOptions } from '../../models/word-options.model';
import { EbookProviderService } from '../../services/ebook-provider.service';

@Component({
  selector: 'app-vocabulary',
  templateUrl: './vocabulary.component.html',
  styleUrls: ['./vocabulary.component.scss'],
})
export class Vocabulary implements OnInit {
  words: WordOptions[] = [];
  userWords: UsersWords[] = [];
  userBookSettings: UserBookSettings;
  optionsChecked: OptionsChecked = {};
  title = 'vocabulary';
  ebook = false;

  constructor(
    private providerService: EbookProviderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.providerService.eventEbookWords$
      .subscribe(
        (eventWords: WordOptions[]) => {
          if (eventWords) {
            this.words = eventWords;
          }
        },
      );

    this.providerService.eventOptionsSetting$
      .subscribe(
        (eventSettings: OptionsChecked) => {
          if (eventSettings) {
            this.optionsChecked = eventSettings;
          }
        },
      );

    this.providerService.eventUserWords$
      .subscribe(
        (event: UsersWords[]) => {
          if (event) {
            this.userWords = event;
          }
        },
      );
  }

  openSettings(): Promise<boolean> {
    const path = this
      .router
      .createUrlTree(['ebook', 'settings'])
      .toString();
    return this.router.navigate([path]);
  }
}
