import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistComponent } from './Productlist.Component';

describe('ArticlelistComponent', () => {
  let component: ProductlistComponent;
  let fixture: ComponentFixture<ProductlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
