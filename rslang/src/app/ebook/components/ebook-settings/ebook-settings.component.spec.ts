import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookSettings } from './ebook-settings.component';

describe('EbookSettingsComponent', () => {
  let component: EbookSettings;
  let fixture: ComponentFixture<EbookSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookSettings ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
