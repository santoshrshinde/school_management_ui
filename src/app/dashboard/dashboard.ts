import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import Chart from 'chart.js/auto';

/* =========================
   Interfaces (Strong Typing)
========================= */

interface Summary {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalAdmissions: number;
}

interface LibraryAnalysis {
  totalBooks: number;
  issuedBooks: number;
  availableBooks: number;
}

interface FeesAnalysis {
  paidFees: number;
  pendingFees: number;
}

interface ExamAnalysis {
  passed: number;
  failed: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.sass'],
  standalone: false
})
export class Dashboard implements OnInit {

  chart: any;

  summary: Summary = {
    totalStudents: 0,
    totalTeachers: 0,
    totalCourses: 0,
    totalAdmissions: 0
  };

  library: LibraryAnalysis = {
    totalBooks: 0,
    issuedBooks: 0,
    availableBooks: 0
  };

  fees: FeesAnalysis = {
    paidFees: 0,
    pendingFees: 0
  };

  exam: ExamAnalysis = {
    passed: 0,
    failed: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.dashboardService.getSummary().subscribe((res: Summary) => {
      this.summary = res;
      this.createChart();
    });

    this.dashboardService.getLibraryAnalysis().subscribe((res: LibraryAnalysis) => {
      this.library = res;
    });

    this.dashboardService.getFeesAnalysis().subscribe((res: FeesAnalysis) => {
      this.fees = res;
    });

    this.dashboardService.getExamAnalysis().subscribe((res: ExamAnalysis) => {
      this.exam = res;
    });
  }

  createChart(): void {
    const ctx = document.getElementById('adminBarChart') as HTMLCanvasElement;
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Students', 'Teachers', 'Courses', 'Admissions'],
        datasets: [
          {
            label: 'School Summary',
            data: [
              this.summary.totalStudents,
              this.summary.totalTeachers,
              this.summary.totalCourses,
              this.summary.totalAdmissions
            ],
            backgroundColor: [
              '#bbdefb',
              '#c8e6c9',
              '#ffe0b2',
              '#e1bee7'
            ],
            borderColor: [
              '#1e88e5',
              '#43a047',
              '#fb8c00',
              '#8e24aa'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
