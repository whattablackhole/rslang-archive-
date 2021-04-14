import { Component, OnInit } from '@angular/core';
import { Game } from './../models/game.model';
import * as AOS  from 'aos';

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
      title: 'Find the pair',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.`,
    },
  ];

  ngOnInit() :void {
      AOS.init();
  }
}
