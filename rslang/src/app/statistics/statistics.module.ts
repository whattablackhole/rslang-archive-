import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [StatisticsPage],
  imports: [CommonModule, StatisticsRoutingModule, SharedModule],
})
export class StatisticsModule {}
