import { Component, OnInit } from '@angular/core';
import { STATISTIC_DATA } from '../../constants/constants';
import { StatisticCalculationService } from '../../services/statistic-calculation.service';
import { Statistic } from '../../models/statistic.model';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPage implements OnInit {
  statisticsList: Statistic[];
  constructor(private statisticCalculation: StatisticCalculationService) {}

  ngOnInit(): void {
    this.statisticsList = this.statisticCalculation.groupByDate(STATISTIC_DATA);
  }
}
