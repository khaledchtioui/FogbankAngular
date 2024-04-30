import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilForumComponent } from './accueil-forum.component';

describe('AccueilForumComponent', () => {
  let component: AccueilForumComponent;
  let fixture: ComponentFixture<AccueilForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
