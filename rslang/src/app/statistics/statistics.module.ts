import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { LongTermStatistic } from './components/long-term-statistic/long-term-statistic.component';
import { ShortTermStatistic } from './components/short-term-statistic/short-term-statistic.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StatisticsPage, LongTermStatistic, ShortTermStatistic],
  imports: [CommonModule, StatisticsRoutingModule, MatTabsModule, SharedModule, ChartsModule],
})
export class StatisticsModule {}
