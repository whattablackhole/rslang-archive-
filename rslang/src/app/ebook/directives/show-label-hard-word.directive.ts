import {
  Directive, Renderer2, ElementRef, HostListener,
} from '@angular/core';

@Directive({
  selector: '[appShowLabelHardWord]',
})
export class ShowLabelHardWordDirective {
  // @Input('appShowLabelHardWord') classVisible = 'visible';
  isInitialState = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  @HostListener('click') onClick(): void {
    this.togglelabel();
  }

  togglelabel(): void {
    this.isInitialState = !this.isInitialState;
    const showLabelEl: HTMLElement = (this.el.nativeElement as HTMLElement)
      .querySelector('label-hard') as HTMLElement;
    if (this.isInitialState) {
      this.renderer.addClass(showLabelEl, 'visible');
    } else {
      this.renderer.removeClass(showLabelEl, 'visible');
    }
  }
}
