import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotMailComponent } from './forgot-mail.component';

describe('ForgotMailComponent', () => {
  let component: ForgotMailComponent;
  let fixture: ComponentFixture<ForgotMailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotMailComponent]
    });
    fixture = TestBed.createComponent(ForgotMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
