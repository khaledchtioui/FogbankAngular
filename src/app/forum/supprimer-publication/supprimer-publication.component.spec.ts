import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerPublicationComponent } from './supprimer-publication.component';

describe('SupprimerPublicationComponent', () => {
  let component: SupprimerPublicationComponent;
  let fixture: ComponentFixture<SupprimerPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupprimerPublicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupprimerPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
