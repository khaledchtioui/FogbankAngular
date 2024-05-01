import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubfrontComponent } from './clubfront.component';

describe('ClubfrontComponent', () => {
  let component: ClubfrontComponent;
  let fixture: ComponentFixture<ClubfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
