import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionfrontComponent } from './adhesionfront.component';

describe('AdhesionfrontComponent', () => {
  let component: AdhesionfrontComponent;
  let fixture: ComponentFixture<AdhesionfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesionfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhesionfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
