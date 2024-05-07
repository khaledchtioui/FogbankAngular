import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsrequestComponent } from './smsrequest.component';

describe('SmsrequestComponent', () => {
  let component: SmsrequestComponent;
  let fixture: ComponentFixture<SmsrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmsrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
