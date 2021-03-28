import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWords } from './list-words.component';

describe('ListWords', () => {
  let component: ListWords;
  let fixture: ComponentFixture<ListWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListWords],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
