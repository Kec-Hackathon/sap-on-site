import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnoManagerialComponent } from './techno-managerial.component';

describe('TechnoManagerialComponent', () => {
  let component: TechnoManagerialComponent;
  let fixture: ComponentFixture<TechnoManagerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnoManagerialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnoManagerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
