import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBar } from './notification-bar.component';

describe('NotificationBar', () => {
  let component: NotificationBar;
  let fixture: ComponentFixture<NotificationBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBar ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
