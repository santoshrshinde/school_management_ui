import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Interface for Course
export interface Course {
  CourseID: number;
  CourseName: string;
}

@Component({
  selector: 'app-list-course',
  standalone: false,
  templateUrl: './list-course.html',
  styleUrl: './list-course.sass'
})
export class ListCourse {
  displayedColumns: string[] = [ 'CourseName', 'Action'];
  dataSource = new MatTableDataSource<Course>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Course>(true, []);

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.getCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Navigate to Add Course Page
  addCourse() {
    this.router.navigateByUrl('course/add-course');
  }

  // Fetch all courses
  getCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load courses:', err);
        this.toastr.error('Failed to load courses', 'Error');
      }
    });
  }

  // Delete course
  delete(id: number) {
    console.log('Delete Course ID', id);
    this.commonService.deleteCourse(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Course deleted successfully', 'Success');
        this.getCourses(); // Refresh course list
      },
      error: (err) => {
        console.error('Failed to delete course:', err);
        this.toastr.error('Failed to delete course', 'Error');
      }
    });
  }

  // Edit course
  edit(id: number) {
    console.log('Edit Course ID', id);
    this.router.navigate(['course/edit-course', id]);
  }

  // Announce sort change (Accessibility)
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Selection methods
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) =>
          this.selection.select(row)
        );
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      let index: number = this.dataSource.data.findIndex((d: any) => d === item);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Course>(this.dataSource.data);
    });
    this.selection = new SelectionModel<Course>(true, []);
  }
}
