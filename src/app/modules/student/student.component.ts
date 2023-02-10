import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './service/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.studentService.getUserDetailById(params['id']).subscribe((res)=>{
        console.log(res);
      })
    })
  }
}
