import {
  AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild,
} from '@angular/core';
import { GameResults } from '../../models/game-results.model';
import { WordWithStatistics } from '../../models/word-statistics.model';
import { GameCoreService } from '../../../games/services/game-core.service';
import { WORDS_API_URL } from '../../constants/constants';

@Component({
  selector: 'app-finish-menu',
  templateUrl: './finish-menu.component.html',
  styleUrls: ['./finish-menu.component.scss'],
  providers: [GameCoreService],
})
export class FinishMenu implements AfterViewInit {
  @ViewChild('waterAnimation', { static: false }) public waterAnimation: ElementRef;
  @Input() correctGamePercent: number;
  @Input() result: number;
  @Input() gameResultWords: GameResults;

  percent = 0;
  interval: number;
  constructor(private gameCoreService: GameCoreService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.runAnimation();
  }

  onPlay(item: WordWithStatistics): void {
    this.gameCoreService.playAudio(`${WORDS_API_URL}/${item.audio}`);
  }

  private runAnimation(): void {
    this.interval = window.setInterval(() => {
      this.percent = this.correctGamePercent ? this.percent + 1 : 0;
      this.renderer.setStyle(this.waterAnimation.nativeElement, 'transform', `translate(0, ${100 - this.percent}%)`);
      if (this.percent === this.correctGamePercent || this.correctGamePercent === 0) {
        window.clearInterval(this.interval);
      }
    }, 60);
  }
}
