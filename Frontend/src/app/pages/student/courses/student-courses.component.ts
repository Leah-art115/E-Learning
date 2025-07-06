import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
}

@Component({
  selector: 'app-student-courses',
  standalone: true, // 👈 mark it as standalone
  imports: [CommonModule], // 👈 import CommonModule for *ngIf, *ngFor, etc.
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // TODO: Replace this with a real API call
    this.enrolledCourses = [
      { id: 1, title: 'Angular Basics', instructor: 'Jane Doe', progress: 70 },
      { id: 2, title: 'NestJS Advanced', instructor: 'John Smith', progress: 40 }
    ];
  }

  continueCourse(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }

  dropCourse(courseId: number) {
    this.enrolledCourses = this.enrolledCourses.filter(c => c.id !== courseId);
    // TODO: Add logic to notify backend and reset progress
  }
}
