import { Component, Input, OnInit } from '@angular/core';
import { GlobalStatistic } from '../../models/statistic.model';
import { GameStatistic } from '../../models/game-statistic.model';
import { GamesAggregationService } from '../../services/games-aggregation.service';

@Component({
  selector: 'app-short-term-statistic',
  templateUrl: './short-term-statistic.component.html',
  styleUrls: ['./short-term-statistic.component.scss'],
})
export class ShortTermStatistic implements OnInit {
  @Input() statistic: GlobalStatistic;
  games: Array<GameStatistic>;
  constructor(private gamesAggregationService: GamesAggregationService) {}

  ngOnInit(): void {
    this.games = this.statistic.gameStatistics;
    // this.gamesAggregationService.aggregation(this.statistic.gameStatistics);
  }
}
