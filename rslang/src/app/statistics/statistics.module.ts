import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StatisticCalculationService } from './services/statistic-calculation.service';
import { GamesAggregationService } from './services/games-aggregation.service';
import { GSProviderService } from './services/gs-provider.service';
import { GSLocalProviderService } from './services/gs-local-provider.service';
import { ShortTermStatistic } from './components/short-term-statistic/short-term-statistic.component';
import { LongTermStatistic } from './components/long-term-statistic/long-term-statistic.component';

@NgModule({
  declarations: [StatisticsPage, LongTermStatistic, ShortTermStatistic],
  imports: [CommonModule, StatisticsRoutingModule, MatTabsModule, SharedModule, ChartsModule],
  providers: [StatisticCalculationService, GamesAggregationService, GSProviderService, GSLocalProviderService],
})
export class StatisticsModule {}
