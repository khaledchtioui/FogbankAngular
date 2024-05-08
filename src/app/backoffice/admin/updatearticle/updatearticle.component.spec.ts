import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatearticleComponent } from './updatearticle.component';

describe('UpdatearticleComponent', () => {
  let component: UpdatearticleComponent;
  let fixture: ComponentFixture<UpdatearticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatearticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
