import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPageComponent } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [StatisticsPageComponent],
  imports: [CommonModule, StatisticsRoutingModule],
})
export class StatisticsModule {}
