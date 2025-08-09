import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export interface Teacher {
  Name: string;
  TeacherID: string;
  Subject: string;
  Contact: string;
  Action?: string;
}
@Component({
  selector: 'app-teacher-list',
  standalone: false,
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.sass'
})
export class TeacherList {
  displayedColumns: string[] = [ 'Name', 'Subject', 'Contact', 'Action'];
  dataSource = new MatTableDataSource<Teacher>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Element>(true, []);
  teachers : Teacher[] = [];
  
  
  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);
  constructor(private router: Router) {
    this.getStudents();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addTeacher() {
    this.router.navigateByUrl('teacher/add-teacher');
  }

  getStudents() {
    this.commonService.getTeacher().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load teacher:', err);
        this.toastr.error('Failed to load teacher', 'Error');
      }
    });
  }

  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteStudent(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Teacher deleted successfully', 'Success');
        this.getStudents(); // Refresh the student list
      },
      error: (err) => {
        console.error('Failed to delete teacher:', err);
        this.toastr.error('Failed to delete teacher', 'Error');
      }
    });
  }

  edit(id: number) {
    console.log('ID', id);
    this.router.navigate(['teacher/edit-teacher', id]);
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Event) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    /* if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    } */
  }



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
     this.selection.selected.forEach(item => {
      let index: number = this.teachers.findIndex((d : any)=> d === item);
      console.log(this.teachers.findIndex((d : any)=> d === item));
      this.dataSource.data.splice(index,1);

      this.dataSource = new MatTableDataSource<Teacher>(this.teachers);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
}
