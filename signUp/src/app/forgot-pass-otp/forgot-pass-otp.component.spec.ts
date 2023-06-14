import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassOtpComponent } from './forgot-pass-otp.component';

describe('ForgotPassOtpComponent', () => {
  let component: ForgotPassOtpComponent;
  let fixture: ComponentFixture<ForgotPassOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPassOtpComponent]
    });
    fixture = TestBed.createComponent(ForgotPassOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
