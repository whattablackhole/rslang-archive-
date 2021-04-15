import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStartSettingsComponent } from './game-start-settings.component';

describe('GameStartSettingsComponent', () => {
  let component: GameStartSettingsComponent;
  let fixture: ComponentFixture<GameStartSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStartSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStartSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
