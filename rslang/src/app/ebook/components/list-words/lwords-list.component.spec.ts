import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsList } from './words-list.component';

describe('ListWords', () => {
  let component: WordsList;
  let fixture: ComponentFixture<WordsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsList],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
