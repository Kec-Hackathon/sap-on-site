import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepreneurshipComponent } from './entrepreneurship.component';

describe('WorkshopComponent', () => {
  let component: EntrepreneurshipComponent;
  let fixture: ComponentFixture<EntrepreneurshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntrepreneurshipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepreneurshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
