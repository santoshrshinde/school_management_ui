import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface Result {
  StudentName: string;
  ExamName: string;
  MarksObtained: number;
  Grade: string;
  Action?: string;
}

@Component({
  selector: 'app-list-result',
  standalone: false,
  templateUrl: './list-result.html',
  styleUrl: './list-result.sass',
})
export class ListResult implements AfterViewInit {
  displayedColumns: string[] = ['StudentName', 'ExamName', 'MarksObtained', 'Grade', 'Action'];
  dataSource = new MatTableDataSource<Result>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Element>(true, []);
  results: Result[] = [];

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.getResult();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Navigate to add-result page
  addResult() {
    this.router.navigateByUrl('result/add-result');
  }

  // Load results from backend
  getResult() {
    this.commonService.getResult().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load results:', err);
        this.toastr.error('Failed to load results', 'Error');
      }
    });
  }

  // Delete a result
  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteResult(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Result deleted successfully', 'Success');
        this.getResult(); // Refresh the result list
      },
      error: (err) => {
        console.error('Failed to delete result:', err);
        this.toastr.error('Failed to delete result', 'Error');
      }
    });
  }

  // Edit a result
  edit(id: number) {
    console.log('ID', id);
    this.router.navigate(['result/edit-result', id]);
  }

  // Announce sorting changes (optional)
announceSortChange(sortState: Sort) {
  if (sortState.direction) {
    console.log(`Sorted ${sortState.active} ${sortState.direction}`);
  } else {
    console.log('Sorting cleared');
  }
}

  // Check if all rows selected
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Remove selected rows
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.results.findIndex((d: any) => d === item);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Result>(this.results);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  // Toggle all rows selection
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
}
