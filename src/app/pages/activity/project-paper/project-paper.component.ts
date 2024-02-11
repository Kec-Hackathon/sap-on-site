import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectPaperMarkData } from 'src/assets/form-data/project-paper-data.mark';

@Component({
  selector: 'app-project-paper',
  templateUrl: './project-paper.component.html',
  styleUrls: ['./project-paper.component.scss'],
})
export class ProjectPaperComponent implements OnInit {
  projectToPaperForm!: FormGroup;
  availablePublishment = [
    'SCI Indexed',
    'WOS/SCOPUS Indexed Journal/Conference',
    'Other Journals/Conferences',
    'Patent',
    'Copyright',
    'NIL',
  ];
  availableType = ProjectPaperMarkData.exportClass();
  imageDisplay?: string;
  isLoading: boolean = false;
  data?: { label: string; mark: number };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.projectToPaperForm.patchValue({ image: file });
    this.projectToPaperForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.projectToPaperForm.invalid) return;

    console.log(this.projectToPaperForm.value);
  }

  onTypeChange(event: any) {
    this.data = event.value;
    this.projectToPaperForm.patchValue({ mark: event.value.mark });
    this.projectToPaperForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.projectToPaperForm = this.formBuilder.group({
      projectTitle: ['', Validators.required],
      projectGuide: ['', Validators.required],
      projectMode: ['', Validators.required],
      publishedIn: ['', Validators.required],
      projectSubmittedDate: [new Date(), Validators.required],
      projectPublishedDate: [new Date(), Validators.required],
      title: ['', Validators.required],
      journalName: ['', Validators.required],
      authors: ['', Validators.required],
      journalDetail: ['', Validators.required],
      issnNumber: ['', Validators.required],
      doiNumber: ['', Validators.required],
      convertionStage: ['', Validators.required],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
