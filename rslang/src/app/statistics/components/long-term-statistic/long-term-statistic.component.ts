import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GlobalStatistic } from '../../models/statistic.model';

@Component({
  selector: 'app-long-term-statistic',
  templateUrl: './long-term-statistic.component.html',
  styleUrls: ['./long-term-statistic.component.scss'],
})
export class LongTermStatistic implements OnInit {
  @Input() statistics: GlobalStatistic[];

  private dates: string[];
  private words : (number | undefined)[];
  private accWords : (number | undefined)[];
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  lineChartLegend: boolean;
  lineChartType: ChartType;

  ngOnInit(): void {
    this.dates = this.statistics.map((item) => item.date.toLocaleDateString());
    this.words = this.statistics.map((item) => item.learnedWords);
    let accumulator = 0;
    this.accWords = this.words.map((item) => {
      accumulator += item || 0;
      return accumulator;
    });
    this.lineChartData = [{ data: this.words, label: 'Learned Words' },
      { data: this.accWords, label: 'Summ Words' }];
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
