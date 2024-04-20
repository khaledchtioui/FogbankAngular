import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlefrontComponent } from './articlefront.component';

describe('ArticlefrontComponent', () => {
  let component: ArticlefrontComponent;
  let fixture: ComponentFixture<ArticlefrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlefrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
