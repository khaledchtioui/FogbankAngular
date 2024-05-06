import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProductComponent } from './AjouterProduct.component';

describe('AdmineditprofileComponent', () => {
  let component: AjouterProductComponent;
  let fixture: ComponentFixture<AjouterProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
