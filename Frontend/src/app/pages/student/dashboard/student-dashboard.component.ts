import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentSidebarComponent } from '../sidebar/student-sidebar.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, StudentSidebarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  enrolledCourses: { name: string }[] = [];
  instructors: { name: string; image: string }[] = [];

  ngOnInit() {
    this.enrolledCourses = [
      { name: 'Object Oriented Programming' },
      { name: 'Fundamentals of database systems' }
    ];
    this.instructors = [
      { name: 'Instructor 1', image: 'assets/instructor1.jpg' },
      { name: 'Instructor 2', image: 'assets/instructor2.jpg' }
    ];
  }
}