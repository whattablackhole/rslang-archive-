import { Component, OnInit } from '@angular/core';
import { Statistic } from '../../models/statistic.model';
import { STATISTIC_DATA } from '../../constants/constants';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
})
export class StatisticsPageComponent implements OnInit {
  statisticsList: Statistic[];

  ngOnInit(): void {
    this.statisticsList = STATISTIC_DATA;
  }
}
