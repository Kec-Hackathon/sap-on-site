import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtExamComponent } from './govt-exam.component';

describe('GovtExamComponent', () => {
  let component: GovtExamComponent;
  let fixture: ComponentFixture<GovtExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovtExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GovtExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
