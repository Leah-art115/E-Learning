import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  hideAuthButtons = false;
  userName: string | null = null;
  userRole: string | null = null;
  searchQuery = '';
  selectedCategory = 'all';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const authRoutes = ['/login', '/register', '/pending', '/under-review'];
        this.hideAuthButtons = authRoutes.includes(event.url);
        this.userName = localStorage.getItem('userName');
        this.userRole = localStorage.getItem('userRole');

        // Check for category parameter in URL
        this.route.queryParams.subscribe(params => {
          if (params['category']) {
            this.selectedCategory = params['category'];
          }
        });
      }
    });
  }

  ngOnInit() {
    // Initialize selected category from URL params
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });
  }

  performSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to courses page with search query and maintain category filter
      const queryParams: any = { q: this.searchQuery.trim() };
      if (this.selectedCategory !== 'all') {
        queryParams.category = this.selectedCategory;
      }
      
      this.router.navigate(['/courses'], { queryParams });
      this.searchQuery = '';
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    
    // Build query params
    const queryParams: any = {};
    if (category !== 'all') {
      queryParams.category = category;
    }
    
    // If there's an active search, maintain it
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        queryParams.q = params['q'];
      }
    });

    // Navigate to courses page with category filter
    this.router.navigate(['/courses'], { queryParams });
  }

  goToDashboard() {
    if (this.userRole === 'instructor') {
      this.router.navigate(['/instructor-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard']);
    }
  }
}