import { Component, OnInit, ViewChild, inject, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../serices/common';

@Component({
  selector: 'app-list-book-issue',
  templateUrl: './list-book-issue.html',
  styleUrls: ['./list-book-issue.sass'],
  standalone: false
})
export class ListBookIssue implements OnInit, AfterViewInit {

  private commonService = inject(Common);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  displayedColumns: string[] = [
    'No',
    'StudentName',
    'BookName',
    'IssueDate',
    'ReturnDate',
    'Status',
    'Action'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadBookIssues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // 🔥 FIXED LOADING
  loadBookIssues() {
    this.commonService.getBookIssues().subscribe({
      next: (data: any[]) => {

        // ✅ Important: new reference for Angular refresh
        this.dataSource.data = [...data];

      },
      error: () => {
        this.toastr.error('Failed to load book issues');
      }
    });
  }

  addBookIssue() {
    this.router.navigate(['book-issue/add-book-issue']);
  }

  edit(issueId: number) {
    if (!issueId) {
      this.toastr.error('Invalid ID');
      return;
    }
    this.router.navigate(['book-issue/edit-book-issue', issueId]);
  }

  delete(issueId: number) {
    if (confirm('Are you sure?')) {
      this.commonService.deleteBookIssue(issueId).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully');
          this.loadBookIssues(); // 🔥 reload after delete
        },
        error: () => {
          this.toastr.error('Delete failed');
        }
      });
    }
  }
}