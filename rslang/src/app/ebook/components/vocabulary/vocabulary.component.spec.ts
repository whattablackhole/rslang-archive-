/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Vocabulary } from './vocabulary.component';


describe('Vocabulary', () => {
  let component: Vocabulary;
  let fixture: ComponentFixture<Vocabulary>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vocabulary ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vocabulary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
