import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';

export interface Teacher {
  TeacherID: number;   // ✅ IMPORTANT FIX
  Name: string;
  Subject: string;
  Contact: string;
}

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.html',
  styleUrls: ['./teacher-list.sass'],
  standalone: false
})
export class TeacherList implements AfterViewInit {

  displayedColumns: string[] = ['Name', 'Subject', 'Contact', 'Action'];
  dataSource = new MatTableDataSource<Teacher>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    this.getTeachers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ LOAD TEACHERS
  getTeachers() {
    this.commonService.getTeacher().subscribe({
      next: (data: any) => {

        console.log("Teacher API:", data); // 🔥 DEBUG

        this.dataSource.data = data;
      },
      error: () => {
        this.toastr.error('Failed to load teachers');
      }
    });
  }

  // ✅ ADD
  addTeacher() {
    this.router.navigateByUrl('teacher/add-teacher');
  }

  // ✅ DELETE (FINAL FIX)
  delete(id: number) {

  console.log("Delete Teacher ID:", id); // 🔥 DEBUG

  if (!id || id === 0) {
    this.toastr.error('Invalid ID');
    return;
  }

  if (confirm('Are you sure to delete teacher?')) {

    this.commonService.deleteTeacher(id).subscribe({

      next: () => {
        this.toastr.success('Teacher deleted successfully');
        this.getTeachers();
      },

      error: (err) => {
        console.error("DELETE ERROR:", err);
        this.toastr.error('Failed to delete teacher');
      }

    });
  }
}

  // ✅ EDIT
  edit(id: number) {

    console.log("Edit Teacher ID:", id);

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    this.router.navigate(['teacher/edit-teacher', id]);
  }

  // ✅ SORT FIX
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}