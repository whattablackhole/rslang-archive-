import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookPage } from './ebook-page.component';

describe('EbookPage', () => {
  let component: EbookPage;
  let fixture: ComponentFixture<EbookPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EbookPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
