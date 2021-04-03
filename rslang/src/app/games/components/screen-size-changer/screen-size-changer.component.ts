import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-size-changer',
  templateUrl: './screen-size-changer.component.html',
  styleUrls: ['./screen-size-changer.component.scss'],
})
export class ScreenSizeChanger {
  screen: HTMLElement = document.documentElement;
  isScreenFull: boolean;
  onOpenFullscreen = (): void => {
    if (this.screen.requestFullscreen) {
      this.isScreenFull = true;
      void this.screen.requestFullscreen(); // eslint-disable-line no-void
    }
  };

  onCloseFullscreen = (): void => {
    if (document.exitFullscreen) {
      this.isScreenFull = false;
      void document.exitFullscreen(); // eslint-disable-line no-void
    }
  };
}
