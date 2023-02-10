import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentData } from '../../core/data/department.data';
import { MessageService } from 'primeng/api';
import { MentorService } from 'src/app/core/auth/mentor.service';
import { AdminService } from './admin.service';

export interface User {
  name?: string;
  email?: string;
  rollno?: string;
  password?: string;
  department?: string;
  mentor_id?: string;
  year?: string;
  image?: string;
  id?: string;
  type?: 'student' | 'mentor';
  is_admin?: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  id: string = '';
  mentorDetail: User;
  availableStudents = [];
  openAddAdminDialog: boolean = false;
  openChangePasswordDialog: boolean = false;
  openNewPasswordDialog: boolean = false;
  addMentorForm!: FormGroup;
  isLoading: boolean = false;
  availableDepartments = DepartmentData.exportClass();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private mentorService: MentorService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.adminService.getUserDetailById(params['id']).subscribe((res) => {
          if (res.user) {
            this.mentorDetail = res.user;
            this.adminService.getMentorStudentList(params['id']).subscribe((users) => {
              if (users.usersList.length > 0) {
                this.availableStudents = users.usersList;
              }
            })
          }
        })
      }
    });
    this._initForm();
  }

  onCardClicked(id: string) {
    this.router.navigate([`a/${this.id}/s`], { queryParams: { 'student': id } });
  }

  showDepartmentMarks() {
    this.router.navigate([`a/${this.id}/show-all-mark`], { queryParams: { department: this.mentorDetail.department } })
  }

  onSubmit() {
    if (this.addMentorForm?.invalid) return;

    this.isLoading = true;

    const mentor = {
      name: this.addMentorForm?.get('name')?.value,
      department: this.mentorDetail.department,
      email: this.addMentorForm?.get('email')?.value,
      password: this.addMentorForm?.get('password')?.value,
      is_admin: this.addMentorForm?.get('isAdmin')?.value,
      user_type: "Mentor",
      roll_no: Date.now()
    };

    this.adminService.addNewMentor(mentor).subscribe((res) => {
      console.log(res);

      this.isLoading = false;
      this.openAddAdminDialog = false;
      if (res.user != null) {
        return this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Admin '${res.user.name}' added successfully!`,
        });
      } else {
        return this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  checkOldPassForm(form: NgForm) {
    this.isLoading = true;
    this.mentorService
      .checkMentorOldPassword(form.value.password, this.id)
      .subscribe((res) => {
        this.isLoading = false;
        if (res.confirmation === true) {
          this.openChangePasswordDialog = false;
          this.openNewPasswordDialog = true;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      });
  }

  updatePassword(form: NgForm) {
    this.isLoading = true;
    this.mentorService
      .updatePassword(form.value.password, this.id)
      .subscribe((res) => {
        this.isLoading = false;
        if (res.updated) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message + ', You will be navigate to login page!',
          });
          this.openNewPasswordDialog = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        }
      });
  }

  private _initForm() {
    this.addMentorForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false],
    });
  }
}