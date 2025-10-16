import { Component, OnInit, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../serices/common';

@Component({
  selector: 'app-list-book-issue',
  templateUrl: './list-book-issue.html',
  styleUrls: ['./list-book-issue.sass'],
  standalone: false,
})
export class ListBookIssue implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  displayedColumns: string[] = ['No', 'StudentName', 'BookName', 'IssueDate', 'ReturnDate', 'Status', 'Action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadBookIssues();
  }

  loadBookIssues() {
    this.commonService.getBookIssues().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load book issues', err);
        this.toastr.error('Failed to load book issues', 'Error');
      }
    });
  }

  addBookIssue() {
    this.router.navigate(['book-issue/add-book-issue']);
  }

  edit(issueId: number) {
    this.router.navigate(['book-issue/add-book-issue', issueId]);
  }

  delete(issueId: number) {
    if (confirm('Are you sure you want to delete this book issue record?')) {
      this.commonService.deleteBookIssue(issueId).subscribe({
        next: () => {
          this.toastr.success('Book issue deleted successfully', 'Success');
          this.loadBookIssues();
        },
        error: (err: any) => {
          console.error('Failed to delete book issue', err);
          this.toastr.error('Failed to delete book issue', 'Error');
        }
      });
    }
  }

  announceSortChange(sortState: Sort) {
    console.log('Sorted by:', sortState.active, sortState.direction);
  }
}
