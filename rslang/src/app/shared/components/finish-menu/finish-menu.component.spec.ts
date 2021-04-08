import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishMenu } from './finish-menu.component';

describe('FinishMenu', () => {
  let component: FinishMenu;
  let fixture: ComponentFixture<FinishMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishMenu],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
