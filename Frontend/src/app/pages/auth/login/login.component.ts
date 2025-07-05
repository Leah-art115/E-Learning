import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationComponent } from '../../../shared/notifications/notification.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  // 👇 Notification state
  showMessage = false;
  message = '';
  messageType: 'success' | 'error' | 'info' = 'info';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
  const payload = {
    email: this.email,
    password: this.password
  };

  const mockResponse = {
    role: 'instructor',
    isApproved: false
  };

  if (mockResponse.role === 'instructor' && !mockResponse.isApproved) {
    this.email = '';
    this.password = '';
    this.router.navigate(['/under-review']);
    return;
  }

  // normal login flow
  this.email = '';
  this.password = '';
  this.router.navigate(['/courses']);
}

}
