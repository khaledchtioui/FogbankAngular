import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubbackComponent } from './clubback.component';

describe('ClubbackComponent', () => {
  let component: ClubbackComponent;
  let fixture: ComponentFixture<ClubbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
