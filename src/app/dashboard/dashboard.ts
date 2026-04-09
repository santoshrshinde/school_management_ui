import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Common } from '../serices/common';

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
  standalone:false
})
export class Dashboard implements OnInit {

  // ✅ Chart (ng2-charts)
  lineLabels: string[] = [];
  lineData: any[] = [
    {
      data: [],
      label: 'Students per Course'
    }
  ];

  // ✅ Dashboard Data
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

  constructor(
    private dashboardService: DashboardService,
    private commonService: Common
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadCourseWise();   // ✅ ONLY THIS CHART
  }

  // ✅ Dashboard Summary
  loadDashboard(): void {

    this.dashboardService.getSummary().subscribe((res: Summary) => {
      this.summary = res;
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

  // ✅ MAIN CHART LOGIC (Course Wise Students)
  loadCourseWise(): void {

    this.dashboardService.getStudentCourseWise().subscribe((res: any[]) => {

      console.log("Course Wise Data:", res); // 🔥 DEBUG

      // 👉 IMPORTANT: fallback for null/empty
      this.lineLabels = res.map((x: any) => x.course || 'Unknown');

      this.lineData = [
        {
          data: res.map((x: any) => x.count),
          label: 'Students per Course'
        }
      ];
    });
  }

}