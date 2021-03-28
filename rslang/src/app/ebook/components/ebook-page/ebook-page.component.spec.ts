import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookHome } from './ebook-home.component';

describe('EbookPageComponent', () => {
  let component: EbookHome;
  let fixture: ComponentFixture<EbookHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EbookHome],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
