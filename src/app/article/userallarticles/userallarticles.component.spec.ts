import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserallarticlesComponent } from './userallarticles.component';

describe('UserallarticlesComponent', () => {
  let component: UserallarticlesComponent;
  let fixture: ComponentFixture<UserallarticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserallarticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserallarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
