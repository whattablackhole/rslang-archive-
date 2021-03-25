import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannahPageComponent } from './savannah-page.component';

describe('SavannahPageComponent', () => {
  let component: SavannahPageComponent;
  let fixture: ComponentFixture<SavannahPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavannahPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannahPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
