import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubspaceComponent } from './clubspace.component';

describe('ClubspaceComponent', () => {
  let component: ClubspaceComponent;
  let fixture: ComponentFixture<ClubspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
