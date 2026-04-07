import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';

export interface Student {
  StudentID: number;   // ✅ IMPORTANT
  Name: string;
  Address: string;
  DateOfBirth: string;
}

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.html',
  styleUrls: ['./list-student.sass'],
  standalone: false
})
export class ListStudent implements AfterViewInit {

  displayedColumns: string[] = ['Name', 'DateOfBirth', 'Address', 'Action'];
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    this.getStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ LOAD STUDENTS
  getStudents() {
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        console.log("Student API:", data); // 🔥 DEBUG
        this.dataSource.data = data;
      },
      error: () => {
        this.toastr.error('Failed to load students');
      }
    });
  }

  // ✅ ADD
  addStudent() {
    this.router.navigateByUrl('student/add-student');
  }

  // ✅ DELETE (WORKING)
  delete(id: number) {

    console.log("Delete ID:", id); // 🔥 DEBUG

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    if (confirm('Are you sure to delete?')) {
      this.commonService.deleteStudent(id).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully');
          this.getStudents();
        },
        error: (err) => {
          console.error("DELETE ERROR:", err);
          this.toastr.error('Failed to delete student');
        }
      });
    }
  }

  // ✅ EDIT
  edit(id: number) {

    console.log("Edit ID:", id);

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    this.router.navigate(['student/edit-student', id]);
  }

  // ✅ FIXED ERROR FUNCTION
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}