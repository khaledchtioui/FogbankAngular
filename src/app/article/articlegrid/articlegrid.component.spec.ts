import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlegridComponent } from './articlegrid.component';

describe('ArticlegridComponent', () => {
  let component: ArticlegridComponent;
  let fixture: ComponentFixture<ArticlegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlegridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
