import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsPage } from './components/statistics-page/statistics-page.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [StatisticsPage],
  imports: [CommonModule, StatisticsRoutingModule, FooterModule],
})
export class StatisticsModule {}
