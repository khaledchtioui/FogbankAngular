import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubbackdeleteComponent } from './clubbackdelete.component';

describe('ClubbackdeleteComponent', () => {
  let component: ClubbackdeleteComponent;
  let fixture: ComponentFixture<ClubbackdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubbackdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubbackdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
