import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsCollections } from './words-collections.component';

describe('Collections', () => {
  let component: WordsCollections;
  let fixture: ComponentFixture<WordsCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordsCollections],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordsCollections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
