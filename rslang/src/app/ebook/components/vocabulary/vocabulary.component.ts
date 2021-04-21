import { Component, OnInit } from '@angular/core';
import { UsersWords } from 'src/app/shared/models/users-words.model';
// import { StorageChanges } from 'src/app/core/models/change-storage.model';
// import { LocalStorageService } from 'src/app/core/services/local-storage.service';
// import { LocalStorageType } from 'src/app/shared/models/change-storage-type.model';
// import { LocalStorageKey } from 'src/app/shared/models/local-storage-keys.model';
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

  constructor(
    private providerService: EbookProviderService,
    // private localStorageService: LocalStorageService,
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
}
