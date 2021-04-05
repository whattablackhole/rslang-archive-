import {
  Directive, OnChanges, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, SimpleChanges, HostListener,
} from '@angular/core';

@Directive({
  selector: '[appPagination]',
  exportAs: 'appPagination',
})
export class PaginationDirective implements OnChanges, OnInit {
  @Input() pageNo = 1;
  @Input() totalPages = 1;

  @Output() pageChange = new EventEmitter<number>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setValue(this.pageNo);
  }

  ngOnChanges({ pageNo, totalPages }: SimpleChanges): void {
    if (totalPages) {
      this.onTotalPagesInput();
    }

    if (pageNo) {
      this.onPageNoInput();
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.pageNo = Number(this.el.nativeElement.value);
    this.pageChange.emit(this.pageNo);
  }

  get isFirst(): boolean {
    return this.pageNo === 1;
  }

  get isLast(): boolean {
    return this.pageNo === this.totalPages;
  }

  first(): void {
    this.setPage(1);
  }

  prev(): void {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  next():void {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

  last(): void {
    this.setPage(this.totalPages);
  }

  private setValue(val: string | number) {
    this.renderer.setProperty(this.el.nativeElement, 'value', String(val));
  }

  private setPage(val: number) {
    this.pageNo = val;
    this.setValue(this.pageNo);
    this.pageChange.emit(this.pageNo);
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

  private onPageNoInput() {
    if (
      typeof this.pageNo !== 'number'
      || this.pageNo < 1
      || this.pageNo > this.totalPages
    ) {
      this.pageNo = 1;
    }

    this.setValue(this.pageNo);
  }
}
