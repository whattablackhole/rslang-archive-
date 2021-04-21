import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { Game } from './../models/game.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main implements OnInit {
  panelOpenState = false;
  games: Game[] = [
    {
      title: 'Savanna',
      description: `Сhoose the correct translation from four options `,
    },
    { title: 'AudioCall', description: `Listen to the voice and choose the correct translation from five options` },
    {
      title: 'Sprint',
      description: `Choose the translation to matches the displayed English word, while the timer is running`,
    },
    {
      title: 'Match the pairs',
      description: `Match English words with their translation.`,
    },
  ];

  ngOnInit() :void {
      AOS.init({
        startEvent: 'load',
      });
  }
}
