import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface Exam {
  CourseName: string;
  Subject: string;
  ExamDate: string;
  TotalMarks: number;
  Action?: string;
}

@Component({
  selector: 'app-list-exam',
  standalone: false,
  templateUrl: './list-exam.html',
  styleUrls: ['./list-exam.sass'],
})
export class ListExam implements AfterViewInit {
  displayedColumns: string[] = ['CourseName', 'Subject', 'ExamDate', 'TotalMarks', 'Action'];
  dataSource = new MatTableDataSource<Exam>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Exam>(true, []);
  exams: Exam[] = [];

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.getExams();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addExam() {
    this.router.navigateByUrl('exam/add-exam');
  }

  getExams() {
    this.commonService.getExam().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load exam records:', err);
        this.toastr.error('Failed to load exam records', 'Error');
      },
    });
  }

  delete(id: number) {
    this.commonService.deleteExam(id).subscribe({
      next: (response) => {
        this.toastr.success('Exam deleted successfully', 'Success');
        this.getExams(); // Refresh list
      },
      error: (err) => {
        console.error('Failed to delete exam:', err);
        this.toastr.error('Failed to delete exam', 'Error');
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['exam/edit-exam', id]);
  }

  announceSortChange(sortState: Event) {
    // Optional: implement live announcer for accessibility
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.exams.findIndex((d) => d === item);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Exam>(this.exams);
    });
    this.selection = new SelectionModel<Exam>(true, []);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
