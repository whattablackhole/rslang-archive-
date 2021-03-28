import { Component, Input, OnInit } from '@angular/core';
import { Statistic } from '../../models/statistic.model';
import { GameStatistic } from '../../models/game-statistic.model';
import { GamesAggregationService } from '../../services/games-aggregation.service';

@Component({
  selector: 'app-short-term-statistic',
  templateUrl: './short-term-statistic.component.html',
  styleUrls: ['./short-term-statistic.component.scss'],
})
export class ShortTermStatisticComponent implements OnInit {
  @Input() statistic: Statistic;
  games: Array<GameStatistic>;
  constructor(private gamesAggregationService: GamesAggregationService) {}

  ngOnInit(): void {
    this.games = this.gamesAggregationService.aggregation(this.statistic.games);
  }
}
