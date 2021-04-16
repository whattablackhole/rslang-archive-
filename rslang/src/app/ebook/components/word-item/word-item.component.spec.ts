import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordItem } from './word-item.component';

describe('WordItem', () => {
  let component: WordItem;
  let fixture: ComponentFixture<WordItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordItem ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
