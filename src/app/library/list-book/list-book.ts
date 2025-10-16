import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.html',
  styleUrls: ['./list-book.sass'],
  standalone:false
})
export class ListBook implements OnInit {
  displayedColumns: string[] = ['BookName', 'Author', 'Publisher', 'TotalQuantity', 'AvailableQuantity', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commonSerice: Common,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.commonSerice.getAllBooks().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => {
        this.toastr.error('Failed to load books', 'Error');
      }
    });
  }

  addBook() {
    this.router.navigateByUrl('/library/add-book');
  }

  edit(BookId: number) {
    this.router.navigateByUrl(`/library/add-book/${BookId}`);
  }

  delete(BookId: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.commonSerice.deleteBook(BookId).subscribe({
        next: () => {
          this.toastr.success('Book deleted successfully', 'Success');
          this.loadBooks();
        },
        error: () => {
          this.toastr.error('Failed to delete book', 'Error');
        }
      });
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.active} ${sortState.direction}`);
    } else {
      console.log('Sorting cleared');
    }
  }
}
