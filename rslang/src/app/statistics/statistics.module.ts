import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ShortTermStatisticComponent } from './components/short-term-statistic/short-term-statistic.component';
import { LongTermStatisticComponent } from './components/long-term-statistic/long-term-statistic.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    StatisticsPageComponent,
    ShortTermStatisticComponent,
    LongTermStatisticComponent,
  ],
  imports: [CommonModule, StatisticsRoutingModule, MaterialModule],
})
export class StatisticsModule {}
