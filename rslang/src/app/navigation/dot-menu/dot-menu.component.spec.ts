import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotMenu } from './dot-menu.component';

describe('DotMenu', () => {
  let component: DotMenu;
  let fixture: ComponentFixture<DotMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DotMenu],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
