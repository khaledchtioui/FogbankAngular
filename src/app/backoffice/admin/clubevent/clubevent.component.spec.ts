import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubeventComponent } from './clubevent.component';

describe('ClubeventComponent', () => {
  let component: ClubeventComponent;
  let fixture: ComponentFixture<ClubeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClubeventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClubeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
