import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../serices/common';

export interface Student {
  id: number;
  StudentName: string;
  attendance: { [key: string]: string };
  missed: number;
}

@Component({
  selector: 'app-list-attendance',
  standalone: false,
  templateUrl: './list-attendance.html',
  styleUrls: ['./list-attendance.sass'],
})
export class ListAttendance implements OnInit, AfterViewInit {

  students: Student[] = [];
  days: number[] = [];
  displayedColumns: string[] = [];

  courses: any[] = [];
  selectedCourseId: number | null = null;

  dataSource = new MatTableDataSource<Student>([]);

  // Store per-month attendance
  monthWiseData: {
    [courseId: number]: {
      [year: number]: {
        [month: number]: Student[];
      };
    };
  } = {};

  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commonService: Common,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadCourses();
    this.generateDays();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //------------------------------------------
  // Generate days for selected month
  //------------------------------------------
  generateDays() {
    const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.displayedColumns = ['StudentName', ...this.days.map(d => d.toString()), 'missed'];
  }

  //------------------------------------------
  // Month Navigation
  //------------------------------------------
  nextMonth() {
    // Save current month data
    this.saveMonthAttendance();

    this.currentMonth++;
    if (this.currentMonth > 12) {
      this.currentMonth = 1;
      this.currentYear++;
    }
    this.generateDays();
    this.loadStudents();
  }

  prevMonth() {
    this.saveMonthAttendance();

    this.currentMonth--;
    if (this.currentMonth < 1) {
      this.currentMonth = 12;
      this.currentYear--;
    }
    this.generateDays();
    this.loadStudents();
  }

  //------------------------------------------
  // Date key for attendance
  //------------------------------------------
  dateStr(day: number): string {
    return day.toString();
  }

  //------------------------------------------
  // Load Courses
  //------------------------------------------
  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (res: any) => {
        this.courses = res;
        this.cd.detectChanges();
      },
      error: () => this.toastr.error("Failed to load courses")
    });
  }

  //------------------------------------------
  // Save attendance of current month in temporary memory
  //------------------------------------------
  saveMonthAttendance() {
    if (!this.selectedCourseId) return;
    if (!this.students || this.students.length === 0) return;

    if (!this.monthWiseData[this.selectedCourseId]) {
      this.monthWiseData[this.selectedCourseId] = {};
    }

    if (!this.monthWiseData[this.selectedCourseId][this.currentYear]) {
      this.monthWiseData[this.selectedCourseId][this.currentYear] = {};
    }

    this.monthWiseData[this.selectedCourseId][this.currentYear][this.currentMonth] =
      JSON.parse(JSON.stringify(this.students)); // deep copy
  }

  //------------------------------------------
  // Load Students (Blank if new month)
  //------------------------------------------
  loadStudents() {
    if (!this.selectedCourseId) {
      this.dataSource.data = [];
      return;
    }

    // If stored month data exists → load it
    const saved =
      this.monthWiseData[this.selectedCourseId]?.[this.currentYear]?.[this.currentMonth];

    if (saved) {
      this.students = JSON.parse(JSON.stringify(saved));
      this.dataSource.data = this.students;
      this.cd.detectChanges();
      return;
    }

    // Fetch fresh data from backend first time only
    this.commonService
      .getAttendanceByCourse(this.selectedCourseId, this.currentMonth, this.currentYear)
      .subscribe({
        next: (res: any) => {
          this.students = res.map((s: any) => ({
            id: s.StudentID,
            StudentName: s.StudentName,
            attendance: s.attendance || this.generateBlankAttendance(),
            missed: Object.values(s.attendance || {}).filter(v => v === 'A').length
          }));

          this.dataSource.data = this.students;
          this.cd.detectChanges();
        },
        error: () => this.toastr.error("Failed to load students"),
      });
  }

  //------------------------------------------
  // Generate Blank Attendance
  //------------------------------------------
  generateBlankAttendance() {
    const daysInMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
    const blank: any = {};
    for (let d = 1; d <= daysInMonth; d++) blank[d] = "";
    return blank;
  }

  //------------------------------------------
  // Toggle Attendance
  //------------------------------------------
  toggleAttendance(student: Student, day: number) {
    const key = day.toString();
    const current = student.attendance[key];
    student.attendance[key] = current === "P" ? "A" : "P";

    // Update missed count
    student.missed = this.days.filter(d => student.attendance[d.toString()] === 'A').length;

    // Save in backend
    this.commonService.saveAttendance({
      StudentID: student.id,
      CourseID: this.selectedCourseId,
      Day: day,
      Month: this.currentMonth,
      Year: this.currentYear,
      Status: student.attendance[key]
    }).subscribe();
  }

  //------------------------------------------
  // CSS Class for P / A
  //------------------------------------------
  getAttendanceClass(status: string) {
    return {
      present: status === 'P',
      absent: status === 'A'
    };
  }
}
