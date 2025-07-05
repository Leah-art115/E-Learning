import { Routes } from '@angular/router';
import { StudentDashboardComponent } from './dashboard/student-dashboard.component';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    title: 'Student Dashboard'
  }
];