import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';

export interface TimeTable {
  TimeTableID: number;
  Course: string;
  Day: string;
  TimeSlot: string;
  Subject: string;
  Teacher: string;
}

@Component({
  selector: 'app-list-timetable',
  templateUrl: './list-timetable.html',
  standalone:false,
  styleUrls: ['./list-timetable.sass']
})
export class ListTimeTable implements AfterViewInit {
  displayedColumns: string[] = ['No', 'Course', 'Day', 'TimeSlot', 'Subject', 'Teacher', 'Action'];
  dataSource = new MatTableDataSource<TimeTable>([]);
  timetables: TimeTable[] = [];
  courses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.loadTimeTable();
    this.loadCourses();
  }

  // Load all timetables
  loadTimeTable() {
    this.commonService.getTimeTable().subscribe({
      next: (data:any) => {
        this.timetables = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load timetables', 'Error');
      }
    });
  }

  // Load all courses for dropdown
  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any[]) => {
        this.courses = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load courses', 'Error');
      }
    });
  }

  // Filter by course name
  onCourseChange(courseName: string) {
    if (courseName === 'all') {
      this.dataSource.data = this.timetables;
    } else {
      this.dataSource.data = this.timetables.filter(t => t.Course === courseName);
    }
    if (this.paginator) this.paginator.firstPage();
  }

  // Edit timetable
  edit(id: number) {
    this.router.navigate(['/timetable/edit-timetable', id]);
  }
    // ✅ Add this function
  addTimetable() {
    this.router.navigateByUrl('/timetable/add-timetable'); // Navigate to AddTimetable component
  }


  // Delete timetable
  delete(id: number) {
    this.commonService.deleteTimeTable(id).subscribe({
      next: () => {
        this.toastr.success('Timetable deleted successfully', 'Success');
        this.loadTimeTable();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to delete timetable', 'Error');
      }
    });
  }

  // Sorting announce for accessibility
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
