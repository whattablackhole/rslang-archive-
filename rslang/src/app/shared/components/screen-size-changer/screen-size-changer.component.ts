import { Component } from '@angular/core';
import { ScreenSizeIcon } from '../../../games/types/screen-size-icon.type';

@Component({
  selector: 'app-screen-size-changer',
  templateUrl: './screen-size-changer.component.html',
  styleUrls: ['./screen-size-changer.component.scss'],
})
export class ScreenSizeChanger {
  screenSizeIcon: ScreenSizeIcon = 'open_with';
  screen: HTMLElement = document.documentElement;

  isScreenFull: boolean;

  onChangeScreenSize(): void {
    if (this.isScreenFull) {
      document
        .exitFullscreen()
        .then(() => {
          this.screenSizeIcon = 'open_with';
          this.isScreenFull = false;
        })
        .catch(() => {
          this.screenSizeIcon = 'highlight_off';
          this.isScreenFull = true;
        });
    } else {
      this.screen
        .requestFullscreen()
        .then(() => {
          this.screenSizeIcon = 'highlight_off';
          this.isScreenFull = true;
        })
        .catch(() => {
          this.screenSizeIcon = 'open_with';
          this.isScreenFull = false;
        });
    }
  }
}
