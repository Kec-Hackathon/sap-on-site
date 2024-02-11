import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  userDetail: any;
  greet!: string;
  hrs = new Date().getHours();
  showSidebar: boolean = false;
  markDetail: any;
  mark!: number;
  showMarkTable = false;

  constructor(private route: ActivatedRoute, private studentService: StudentService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.calculateGreet();
    this.route.params.subscribe((params) => {
      this.studentService.getUserDetailById(params['id']).subscribe((res) => {
        if (res.user) {
          this.userDetail = res.user;
        }
      })
      this.studentService.getMarkById(params['id']).subscribe((res) => {
        if (res.mark) {
          this.markDetail = res.mark;
        }
      })
    })
  }

  calculateGreet() {
    if (this.hrs < 12)
      this.greet = 'Good Morning';
    else if (this.hrs >= 12 && this.hrs <= 17)
      this.greet = 'Good Afternoon';
    else if (this.hrs >= 17 && this.hrs <= 24)
      this.greet = 'Good Evening';
  }

  onProfileClicked() {
    this.showSidebar = true;
  }

  onThemeChange(event: any) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;

    if (event.checked) {
      themeLink.href = 'arya-dark-blue.css';
      localStorage.setItem('theme', 'arya-dark-blue.css');
    } else {
      themeLink.href = 'saga-light-blue.css';
      localStorage.setItem('theme', 'saga-light-blue.css');
    }
  }
}
