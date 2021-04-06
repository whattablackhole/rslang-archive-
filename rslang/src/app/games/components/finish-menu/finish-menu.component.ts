import {
  Component, ElementRef, Input, OnInit, ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-finish-menu',
  templateUrl: './finish-menu.component.html',
  styleUrls: ['./finish-menu.component.scss'],
})
export class FinishMenu implements OnInit {
  @ViewChild('water', { static: false }) public water: ElementRef;
  @Input() correctGamePercent: number;
  @Input() result: number;
  percent = 0;
  interval: number;

  ngOnInit(): void {
    this.runAnimation();
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
