import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubbackeditComponent } from './clubbackedit.component';

describe('ClubbackeditComponent', () => {
  let component: ClubbackeditComponent;
  let fixture: ComponentFixture<ClubbackeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubbackeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubbackeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
