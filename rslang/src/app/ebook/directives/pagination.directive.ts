import {
  Directive, OnChanges, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges, HostListener,
} from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'appPagination',
})
export class PaginationDirective implements OnChanges, OnInit {
  @Input() pageNumber = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setValue(this.pageNumber);
  }

  ngOnChanges({ pageNumber, totalPages }: SimpleChanges): void {
    if (totalPages) {
      this.onTotalPagesInput();
    }

    if (pageNumber) {
      this.onpageNumberInput();
    }
  }

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    this.setValue(this.getParsedValue(value));
  }

  @HostListener('change', ['$event.target.value']) onChange(value: string):void {
    if (value === '') {
      this.setValue(1);
    }

    if (this.isOutOfRange(value)) {
      this.setValue(this.totalPages);
    }

    this.pageNumber = Number((this.el.nativeElement as HTMLInputElement).value);
    this.pageChange.emit(this.pageNumber);
  }

  get isFirst(): boolean {
    return this.pageNumber === 1;
  }

  get isLast(): boolean {
    return this.pageNumber === this.totalPages;
  }

  first(): void {
    this.setPage(1);
  }

  prev(): void {
    this.setPage(Math.max(1, this.pageNumber - 1));
  }

  next():void {
    this.setPage(Math.min(this.totalPages, this.pageNumber + 1));
  }

  last(): void {
    this.setPage(this.totalPages);
  }

  private setValue(val: string | number) {
    this.renderer.setProperty(this.el.nativeElement, 'value', String(val));
  }

  private setPage(val: number) {
    this.pageNumber = val;
    this.setValue(this.pageNumber);
    this.pageChange.emit(this.pageNumber);
  }

  private getParsedValue(val: string): string {
    return val.replace(/(^0)|([^0-9]+$)/, '');
  }

  private isOutOfRange(val: string): boolean {
    return Number(val) > this.totalPages;
  }

  private onTotalPagesInput() {
    if (typeof this.totalPages !== 'number') {
      this.totalPages = 1;
    }
  }

  private onpageNumberInput() {
    if (
      typeof this.pageNumber !== 'number'
      || this.pageNumber < 1
      || this.pageNumber > this.totalPages
    ) {
      this.pageNumber = 1;
    }

    this.setValue(this.pageNumber);
  }
}
