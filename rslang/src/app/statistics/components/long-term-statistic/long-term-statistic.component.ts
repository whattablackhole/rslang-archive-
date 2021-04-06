import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Statistic } from '../../models/statistic.model';

@Component({
  selector: 'app-long-term-statistic',
  templateUrl: './long-term-statistic.component.html',
  styleUrls: ['./long-term-statistic.component.scss'],
})
export class LongTermStatistic implements OnInit {
  @Input() statistics: Statistic[];

  public dates: string[];
  public words : (number | undefined)[];
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartOptions: ChartOptions;
  public lineChartColors: Color[];
  public lineChartLegend: boolean;
  public lineChartType: ChartType;

  ngOnInit(): void {
    this.dates = this.statistics.map((item) => item.date.toLocaleDateString());
    this.words = this.statistics.map((item) => item.learnedWords);
    this.lineChartData = [{ data: this.words, label: 'Learned Words' }];
    this.lineChartLabels = this.dates;
    this.lineChartOptions = {
      responsive: true,
    };
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255,255,0,0.28)',
      },
    ];

    this.lineChartLegend = true;
    this.lineChartType = 'line';
  }
}
