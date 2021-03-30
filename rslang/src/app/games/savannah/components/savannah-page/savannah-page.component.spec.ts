import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannahPage } from './savannah-page.component';

describe('SavannahPage', () => {
  let component: SavannahPage;
  let fixture: ComponentFixture<SavannahPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannahPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
