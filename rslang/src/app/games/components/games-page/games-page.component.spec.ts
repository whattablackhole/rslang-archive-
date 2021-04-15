import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesPage } from './games-page.component';

describe('GamesPage', () => {
  let component: GamesPage;
  let fixture: ComponentFixture<GamesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
