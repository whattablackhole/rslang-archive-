import {
  Directive, Renderer2, ElementRef, HostListener,
} from '@angular/core';

@Directive({
  selector: '[appShowLabelHardWord]',
})
export class ShowLabelHardWordDirective {
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
    const showLabelEl = (this.el.nativeElement as HTMLElement)
      .querySelector('.label-hard') as HTMLElement;
    if (this.isInitialState) {
      this.renderer.removeStyle(showLabelEl, 'visibility');
    } else {
      this.renderer.setStyle(showLabelEl, 'visibility', 'hidden');
    }
  }
}
