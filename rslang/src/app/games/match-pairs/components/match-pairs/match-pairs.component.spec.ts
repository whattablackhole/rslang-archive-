/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchPairs } from './match-pairs.component';


describe('MatchPairs', () => {
  let component: MatchPairs;
  let fixture: ComponentFixture<MatchPairs>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchPairs ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchPairs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
