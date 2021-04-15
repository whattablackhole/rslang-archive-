import { Component } from '@angular/core';
import { Game } from '../../interfaces/game.model';

@Component({
  selector: 'app-games-page',
  templateUrl: './games-page.component.html',
  styleUrls: ['./games-page.component.scss'],
})
export class GamesPage {
  games: Game[] = [
    {
      title: 'Savannah',
      description: 'Сhoose the correct translation from four options ',
      url: { background: "url('/assets/main/games/savannah.jpg')" },
    },
    {
      title: 'AudioCall',
      description: 'Listen to the voice and choose the correct translation from five options',
      url: { background: "url('/assets/main/games/audiocall.jpg')" },
    },
    {
      title: 'Sprint',
      description: 'Choose the translation to matches the displayed English word, while the timer is running',
      url: { background: "url('/assets/main/games/sprint.jpg')" },
    },
    {
      title: 'Find the pair',
      description: 'Greate opportunity to train your memory focus',
      url: { background: "url('/assets/main/games/pair.jpg')" },
    },
  ];
}
