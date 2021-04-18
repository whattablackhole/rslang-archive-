import {
  Directive, ElementRef, HostBinding, HostListener, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDeactivateCard]',
})
export class DeactivateCardDirective {
  @HostBinding('style.opacity') elRefOpacity = 1;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onClick() {
    this.elRefOpacity = 0.5;
    this.renderer.setAttribute(this.elRef.nativeElement, 'disabled', 'true');
  }
}
