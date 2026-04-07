import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';

export interface TimeTable {
  TimeTableID: number;
  CourseName: string;
  Day: string;
  TimeSlot: string;
  Subject: string;
  TeacherName: string;
}

@Component({
  selector: 'app-list-timetable',
  templateUrl: './list-timetable.html',
  styleUrls: ['./list-timetable.sass'],
  standalone:false
})
export class ListTimeTable implements OnInit {

  displayedColumns: string[] = [
    'No',
    'Course',
    'Day',
    'TimeSlot',
    'Subject',
    'Teacher',
    'Action'
  ];

  dataSource = new MatTableDataSource<any>([]);
  courses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadTimeTable();
    this.loadCourses();
  }

  // ✅ EXACT SAME AS TEACHER STYLE
  loadTimeTable() {

    this.commonService.getTimeTable().subscribe({

      next: (data: any) => {

        console.log("API DATA:", data); // 🔥 DEBUG

        // ✅ NO mapping → NO ID issue
        this.dataSource.data = data;

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });

      },

      error: () => {
        this.toastr.error('Failed to load timetable');
      }

    });

  }

  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
      },
      error: () => {
        this.toastr.error('Failed to load courses');
      }
    });
  }

  onCourseChange(course: string) {

    if (course === 'all') {
      this.loadTimeTable();
    } else {
      this.dataSource.data = this.dataSource.data.filter(
        (t: any) => t.CourseName === course
      );
    }

    if (this.paginator) {
      this.paginator.firstPage();
    }

  }

  addTimetable() {
    this.router.navigate(['/timetable/add-timetable']);
  }

  // ✅ EXACT SAME AS TEACHER
  edit(id: number) {

    console.log("Edit ID:", id);

    this.router.navigate(['/timetable/edit-timetable', id]);
  }

  // ✅ EXACT SAME AS TEACHER
  delete(id: number) {

    console.log("Delete ID:", id);

    this.commonService.deleteTimetable(id).subscribe({

      next: () => {
        this.toastr.success('Deleted successfully');
        this.loadTimeTable();
      },

      error: () => {
        this.toastr.error('Delete failed');
      }

    });

  }

}