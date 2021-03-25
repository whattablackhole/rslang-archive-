import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintPageComponent } from './sprint-page.component';

describe('SprintPageComponent', () => {
  let component: SprintPageComponent;
  let fixture: ComponentFixture<SprintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SprintPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
