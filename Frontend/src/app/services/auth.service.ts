import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AppUser {
  uid: string;
  email: string | null;
  role: string; // e.g., 'instructor' or 'student'
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<AppUser | null>;

  constructor() {
    // Mock user data until backend is ready
    this.user$ = of({
      uid: '123',
      email: 'instructor@example.com',
      role: 'instructor' // Simulate an instructor; change to 'student' or null for testing
    });
    // For testing logged-out state, use: this.user$ = of(null);
  }

  isInstructor(): Observable<boolean> {
    return this.user$.pipe(map(user => user?.role === 'instructor'));
  }
}