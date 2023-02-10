import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTableComponent } from './mark-table.component';

describe('MarkTableComponent', () => {
  let component: MarkTableComponent;
  let fixture: ComponentFixture<MarkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
