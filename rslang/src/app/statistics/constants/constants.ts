import { Statistic } from '../models/statistic.model';

export const STATISTIC_DATA: Statistic[] = [
  {
    date: new Date('03.28.2021'),
    games: [
      {
        name: 'savannah',
        winrate: 80, // количество правильных ответов
        streak: 10,
      },
      {
        name: 'savannah',
        winrate: 100,
        streak: 15,
      },
      {
        name: 'savannah',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'sprint',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'audiocall',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'audiocall',
        winrate: 70,
        streak: 7,
      },
    ],
    learnedWords: [
      {
        id: '5e9f5ee35eb9e72bc21af4a1',
      },
      {
        id: '5e9f5ee35eb9e72bc21af4a0',
      },
      {
        id: '5e9f5ee35eb9e72bc21af4cb',
      },
    ],
  },
  {
    date: new Date('03.29.2021'),
    games: [
      {
        name: 'savannah',
        winrate: 80,
        streak: 10,
      },
      {
        name: 'savannah',
        winrate: 100,
        streak: 15,
      },
      {
        name: 'savannah',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'sprint',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'audiocall',
        winrate: 50,
        streak: 5,
      },
      {
        name: 'audiocall',
        winrate: 70,
        streak: 5,
      },
    ],
    learnedWords: [
      {
        id: '5e9f5ee35eb9e72bc21af4a1',
      },
      {
        id: '5e9f5ee35eb9e72bc21af4a0',
      },
      {
        id: '5e9f5ee35eb9e72bc21af4cb',
      },
    ],
  },
];
