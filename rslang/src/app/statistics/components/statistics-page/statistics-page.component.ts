import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { STATISTIC_DATA } from '../../constants/constants';
import { StatisticCalculationService } from '../../services/statistic-calculation.service';
import { Statistic } from '../../models/statistic.model';
import { GSProviderService } from '../../services/gs-provider.service';
import { GameSession } from '../../models/game-session.model';
import { GSLocalProviderService } from '../../services/gs-local-provider.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { APP_CONFIG, AppConfig } from '../../services/config.token';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  providers: [LocalStorageService, HttpClient, {
    provide: GSProviderService,
    useFactory: (config: AppConfig, http: HttpClient, local: LocalStorageService) => (
      config.user ? new GSProviderService(http) : new GSLocalProviderService(local)
    ),
    deps: [APP_CONFIG, HttpClient, LocalStorageService],
  }],
})
export class StatisticsPage implements OnInit {
  statisticsList: Statistic[];
  gameSessions: GameSession[];
  constructor(private statisticCalculation: StatisticCalculationService,
    private gsProvider: GSProviderService, private local: LocalStorageService) {}

  ngOnInit(): void {
    this.local.setItem('GameSession', JSON.stringify(STATISTIC_DATA));
    //this.local.setItem('GameSession', JSON.stringify([]));
    this.gsProvider.getGameSessions().subscribe((gameSessions) => {
      this.gameSessions = gameSessions;
    });
    this.statisticsList = this.statisticCalculation.groupByDate(this.gameSessions);
  }
}
