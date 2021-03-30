import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiocallPage } from './audiocall-page.component';

describe('AudiocallPage', () => {
  let component: AudiocallPage;
  let fixture: ComponentFixture<AudiocallPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudiocallPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiocallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
