import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import jsPDF from 'jspdf';

interface Certificate {
  courseTitle: string;
  dateCompleted: string;
  certificateImage: string; // image path, e.g., /certificate.jpg
}

@Component({
  selector: 'app-student-certifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-certifications.component.html',
  styleUrls: ['./student-certifications.component.css']
})
export class StudentCertificationsComponent implements OnInit {
  certificates: Certificate[] = [];

  ngOnInit(): void {
    this.certificates = [
      {
        courseTitle: 'Angular Basics',
        dateCompleted: '2025-07-01',
        certificateImage: '/certificate.jpg'
      },
      {
        courseTitle: 'NestJS Advanced',
        dateCompleted: '2025-07-03',
        certificateImage: '/certificate.jpg'
      }
    ];
  }

  async downloadCertificate(imagePath: string) {
    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [img.width, img.height]
      });

      pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
      pdf.save('certificate.pdf');
    };

    img.onerror = () => {
      alert('Failed to load certificate image.');
    };
  }
}
