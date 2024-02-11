import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryComponent } from './voluntary.component';

describe('VoluntaryComponent', () => {
  let component: VoluntaryComponent;
  let fixture: ComponentFixture<VoluntaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoluntaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
