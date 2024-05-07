import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingalementListComponent } from './singalement-list.component';

describe('SingalementListComponent', () => {
  let component: SingalementListComponent;
  let fixture: ComponentFixture<SingalementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingalementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingalementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
