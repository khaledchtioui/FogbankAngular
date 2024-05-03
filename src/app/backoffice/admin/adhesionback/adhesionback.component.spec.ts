import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionbackComponent } from './adhesionback.component';

describe('AdhesionbackComponent', () => {
  let component: AdhesionbackComponent;
  let fixture: ComponentFixture<AdhesionbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesionbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhesionbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
