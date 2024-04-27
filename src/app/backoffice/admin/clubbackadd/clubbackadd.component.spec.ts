import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubbackaddComponent } from './clubbackadd.component';

describe('ClubbackaddComponent', () => {
  let component: ClubbackaddComponent;
  let fixture: ComponentFixture<ClubbackaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubbackaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubbackaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
