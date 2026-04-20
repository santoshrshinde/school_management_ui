import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Common } from '../serices/common';
import { ChangeDetectorRef } from '@angular/core';

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

  lineLabels: string[] = [];
  lineData: any[] = [
    {
      data: [],
      label: 'Students per Course'
    }
  ];

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

  // ✅ FIXED
  fees: FeesAnalysis = {
    paidFees: 0,
    pendingFees: 0
  };

  exam: ExamAnalysis = {
    passed: 0,
    failed: 0
  };

  pieChartData: any = {
    labels: ['Issued', 'Available'],
    datasets: [{ data: [] }]
  };

  barChartData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Books per Category'
      }
    ]
  };

  lineChartLibData: any = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Books Trend'
      }
    ]
  };

  feesPieData: any = { labels: [], datasets: [{ data: [] }] };
  feesBarData: any = { labels: [], datasets: [{ data: [], label: 'Fees' }] };
  feesLineData: any = { labels: [], datasets: [{ data: [], label: 'Revenue' }] };
  defaulters: any[] = [];
  transportBarData: any = { labels: [], datasets: [{ data: [], label: 'Students' }] };
  mostUsedBus: any = {};
  emptyBuses: string[] = [];

  constructor(
    private dashboardService: DashboardService,
    private commonService: Common,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
    this.loadCourseWise();
    this.loadBooksChart();
    this.loadFeesCharts();
    this.loadTransportAnalysis();
  }

  // ✅ 🔥 FIX HERE
  loadDashboard(): void {

    this.dashboardService.getSummary().subscribe((res: Summary) => {
      this.summary = res;
    });

    this.dashboardService.getLibraryAnalysis().subscribe((res: LibraryAnalysis) => {
      this.library = res;
    });

    // ✅ FIXED MAPPING
    this.dashboardService.getFeesAnalysis().subscribe((res: any) => {

      console.log("Fees API Response:", res);

      this.fees = {
        paidFees: res.paid || 0,
        pendingFees: res.pending || 0
      };

    });

    this.dashboardService.getExamAnalysis().subscribe((res: ExamAnalysis) => {
      this.exam = res;
    });
  }

  loadCourseWise(): void {
    this.dashboardService.getStudentCourseWise().subscribe((res: any[]) => {

      this.lineLabels = res.map(x => x.course);
      this.lineData = [
        {
          data: res.map(x => x.count),
          label: 'Students per Course'
        }
      ];
    });
  }

  loadBooksChart(): void {
    this.dashboardService.getBooksAnalysis().subscribe((res: any[]) => {

      if (!res || res.length === 0) return;

      const labels = res.map(x => x.book);
      const available = res.map(x => x.available);
      const issued = res.map(x => x.total - x.available);
      const total = res.map(x => x.total);

      setTimeout(() => {

        this.barChartData = {
          labels: [...labels],
          datasets: [
            { data: [...available], label: 'Available Books' },
            { data: [...issued], label: 'Issued Books' }
          ]
        };

        this.pieChartData = {
          labels: [...labels],
          datasets: [
            { data: [...total] }
          ]
        };

        this.lineChartLibData = {
          labels: [...labels],
          datasets: [
            { data: [...issued], label: 'Issued Trend' }
          ]
        };

        this.cdr.detectChanges();

      }, 100);
    });
  }

  // ✅ 🔥 FIXED CHART ALSO
  loadFeesCharts() {
    this.dashboardService.getFeesAnalysis().subscribe((res: any) => {

      setTimeout(() => {

        this.feesPieData = {
          labels: ['Paid', 'Pending'],
          datasets: [{ data: [res.paid || 0, res.pending || 0] }]
        };

        this.feesBarData = {
          labels: res.courseData.map((c: any) => c.course),
          datasets: [{ data: res.courseData.map((c: any) => c.total), label: 'Fees' }]
        };

        this.feesLineData = {
          labels: res.monthlyData.map((m: any) => 'Month ' + m.month),
          datasets: [{ data: res.monthlyData.map((m: any) => m.total), label: 'Revenue' }]
        };

        this.defaulters = res.defaulters;

        this.cdr.detectChanges();

      }, 100);
    });
  }
  loadTransportAnalysis() {
  this.dashboardService.getTransportAnalysis().subscribe((res: any) => {

    console.log("Transport Data:", res);

    // 🟢 Bar Chart (Bus-wise students)
    this.transportBarData = {
      labels: res.busData.map((b: any) => b.bus),
      datasets: [
        {
          data: res.busData.map((b: any) => b.count),
          label: 'Students per Bus'
        }
      ]
    };

    // 🔵 Most Used
    this.mostUsedBus = res.mostUsed;

    // 🔴 Empty Buses
    this.emptyBuses = res.emptyBuses;

    this.cdr.detectChanges();
  });
}
}