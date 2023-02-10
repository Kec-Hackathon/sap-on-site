import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NccNssComponent } from './ncc-nss.component';

describe('NccNssComponent', () => {
  let component: NccNssComponent;
  let fixture: ComponentFixture<NccNssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NccNssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NccNssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
