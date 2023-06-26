import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoqHomeComponent } from './noq-home.component';

describe('NoqHomeComponent', () => {
  let component: NoqHomeComponent;
  let fixture: ComponentFixture<NoqHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoqHomeComponent]
    });
    fixture = TestBed.createComponent(NoqHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
