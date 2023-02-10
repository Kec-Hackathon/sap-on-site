import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  userDetail: any
  greet!: string;
  hrs = new Date().getHours();

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit(): void {
    this.calculateGreet();
    this.route.params.subscribe((params)=>{
      this.studentService.getUserDetailById(params['id']).subscribe((res)=>{
        if(res.user) {
          this.userDetail = res.user;
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
}
