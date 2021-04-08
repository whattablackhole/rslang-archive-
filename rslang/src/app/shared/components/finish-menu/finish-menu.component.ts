import {
  AfterViewInit, Component, ElementRef, Input, ViewChild,
} from '@angular/core';
import { GameResults } from '../../models/game-results.model';
import { WordWithStatistics } from '../../models/word-statistics.model';
import { GameCoreService } from '../../../games/services/game-core.service';

@Component({
  selector: 'app-finish-menu',
  templateUrl: './finish-menu.component.html',
  styleUrls: ['./finish-menu.component.scss'],
  providers: [GameCoreService],
})
export class FinishMenu implements AfterViewInit {
  @ViewChild('water', { static: false }) public water: ElementRef;
  @Input() correctGamePercent: number;
  @Input() result: number;
  @Input() gameResultWords: GameResults;

  percent = 0;
  interval: number;
  constructor(private gameCoreService: GameCoreService) {}
  ngAfterViewInit(): void {
    this.runAnimation();
  }

  onPlay(item: WordWithStatistics): void {
    this.gameCoreService.playAudio(`assets/${item.audio}`);
  }

  private runAnimation(): void {
    this.interval = window.setInterval(() => {
      this.percent = this.correctGamePercent ? this.percent + 1 : 0;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      this.water.nativeElement.style.transform = `translate(0, ${100 - this.percent}%)`;
      if (this.percent === this.correctGamePercent || this.correctGamePercent === 0) {
        window.clearInterval(this.interval);
      }
    }, 60);
  }
}
