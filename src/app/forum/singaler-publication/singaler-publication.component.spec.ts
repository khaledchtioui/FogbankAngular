import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingalerPublicationComponent } from './singaler-publication.component';

describe('SingalerPublicationComponent', () => {
  let component: SingalerPublicationComponent;
  let fixture: ComponentFixture<SingalerPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingalerPublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingalerPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
