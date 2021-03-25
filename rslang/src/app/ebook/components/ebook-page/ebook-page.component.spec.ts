import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookPageComponent } from './ebook-page.component';

describe('EbookPageComponent', () => {
  let component: EbookPageComponent;
  let fixture: ComponentFixture<EbookPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EbookPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
