import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../../shared/notifications/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, NotificationComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  showPassword = false;
  role: 'learner' | 'instructor' = 'learner';
  expertise = '';
  cvFile: File | null = null;

  showMessage = false;
  message = '';
  messageType: 'success' | 'error' | 'info' = 'info';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput?.files?.[0];
    if (file && file.type === 'application/pdf') {
      this.cvFile = file;
    } else {
      this.cvFile = null;
      this.showMessage = true;
      this.message = 'Please upload a valid PDF file.';
      this.messageType = 'error';
    }
  }

  onRegister() {
    if (this.role === 'instructor' && (!this.cvFile || !this.expertise)) {
      this.message = 'Please fill in all instructor fields and upload a valid CV.';
      this.messageType = 'error';
      this.showMessage = true;
      return;
    }

    const payload: any = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role
    };

    if (this.role === 'instructor') {
      payload.expertise = this.expertise;
      payload.cv = this.cvFile;
    }

    console.log('Registering user:', payload);

    this.message = 'Registration successful!';
    this.messageType = 'success';
    this.showMessage = true;

    this.fullName = '';
    this.email = '';
    this.password = '';
    this.expertise = '';
    this.cvFile = null;
    this.role = 'learner';

    setTimeout(() => {
  if (this.role === 'instructor') {
    this.router.navigate(['/pending']);
  } else {
    this.router.navigate(['/login']);
  }
}, 1000);

  }
}
