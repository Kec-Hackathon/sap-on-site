import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NptelComponent } from './nptel.component';

describe('NptelComponent', () => {
  let component: NptelComponent;
  let fixture: ComponentFixture<NptelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NptelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NptelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
