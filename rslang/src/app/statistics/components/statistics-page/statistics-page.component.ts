import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StatisticCalculationService } from '../../services/statistic-calculation.service';
import { GlobalStatistic } from '../../models/statistic.model';
import { GSProviderService } from '../../services/gs-provider.service';
import { GSLocalProviderService } from '../../services/gs-local-provider.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Statistics } from '../../../shared/models/statistics-short.model';
import { BackEndStatistics } from '../../../shared/models/statistics-backend.model';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  providers: [LocalStorageService, HttpClient, {
    provide: GSProviderService,
    useFactory: (authService: AuthService, http: HttpClient, local: LocalStorageService) => (
      authService.getUserAuthenticationStatus()
        ? new GSProviderService(http, authService)
        : new GSLocalProviderService(local)
    ),
    deps: [AuthService, HttpClient, LocalStorageService],
  }],
})
export class StatisticsPage implements OnInit {
  statisticsList: GlobalStatistic[] = [];
  gameSessions: Statistics[] = [];
  constructor(private statisticCalculation: StatisticCalculationService,
    private gsProvider: GSProviderService, private local: LocalStorageService) {}

  ngOnInit(): void {
    this.gsProvider.getGameSessions()
      .subscribe(
        (gameSessions) => {
          if (this.gameSessions !== undefined) {
            this.gameSessions = gameSessions.optional.stats;
            this.statisticsList = this.statisticCalculation.groupByDate(this.gameSessions);
          }
        },
      );
    this.statisticsList = this.statisticCalculation.groupByDate(this.gameSessions);
  }
}
