import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiocallPageComponent } from './audiocall-page.component';

describe('AudiocallPageComponent', () => {
  let component: AudiocallPageComponent;
  let fixture: ComponentFixture<AudiocallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiocallPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiocallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
