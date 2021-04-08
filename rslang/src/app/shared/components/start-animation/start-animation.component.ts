import { Component, Input } from '@angular/core';
import {
  animate, animation, keyframes, style, transition, trigger, AnimationEvent,
} from '@angular/animations';
import { GameCoreService } from '../../../games/services/game-core.service';
import { HiddenTextAnimationState } from '../../../games/sprint/types/hidden-text.type';

@Component({
  selector: 'app-start-animation',
  templateUrl: './start-animation.component.html',
  styleUrls: ['./start-animation.component.scss'],
  animations: [
    trigger('hideText', [
      transition(
        '* => off',
        animation([
          animate(
            '4.3s',
            keyframes([
              style({ opacity: '0', offset: 0 }),
              style({ opacity: '0', offset: 0.9 }),
              style({ opacity: '1', offset: 1 }),
            ]),
          ),
        ]),
      ),
    ]),
  ],
})
export class StartAnimation {
  @Input() hiddenTextAnimationState: HiddenTextAnimationState;
  @Input() isGameStarted: boolean;

  constructor(private gameCoreService: GameCoreService) {}

  onAnimationEvent(event: AnimationEvent): void {
    if (event.toState === 'off') {
      this.gameCoreService.playAudio('/assets/games/sprint/start-game.mp3');
    }
    this.hiddenTextAnimationState = 'on';
  }
}
