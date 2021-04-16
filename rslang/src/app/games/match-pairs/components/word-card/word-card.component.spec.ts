/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WordCard } from './word-card.component';


describe('WordCard', () => {
  let component: WordCard;
  let fixture: ComponentFixture<WordCard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordCard ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
