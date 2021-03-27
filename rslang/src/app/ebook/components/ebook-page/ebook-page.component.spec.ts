import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookHomeComponent } from './ebook-home.component';

describe('EbookPageComponent', () => {
  let component: EbookHomeComponent;
  let fixture: ComponentFixture<EbookHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EbookHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
