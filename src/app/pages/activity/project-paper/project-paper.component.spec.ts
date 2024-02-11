import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaperComponent } from './project-paper.component';

describe('ProjectPaperComponent', () => {
  let component: ProjectPaperComponent;
  let fixture: ComponentFixture<ProjectPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
