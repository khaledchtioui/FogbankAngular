import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponsePublicationDetailsComponent } from './reponse-publication-details.component';

describe('ReponsePublicationDetailsComponent', () => {
  let component: ReponsePublicationDetailsComponent;
  let fixture: ComponentFixture<ReponsePublicationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponsePublicationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReponsePublicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
