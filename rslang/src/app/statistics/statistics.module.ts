import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [StatisticsPage],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
