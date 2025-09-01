import { AfterViewInit, Component, inject,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Schoolbus{
  BusID:number;
  BusNumber:string
  Driver:string
}
@Component({
  selector: 'app-list-schoolbus',
  standalone: false,
  templateUrl: './list-schoolbus.html',
  styleUrls: ['./list-schoolbus.sass']
})
export class ListSchoolbus implements  AfterViewInit {
  displayedColumns: string[] = ['BusNumber', 'Driver', 'Action'];

  dataSource = new MatTableDataSource<Schoolbus>([]);
  selection = new SelectionModel<Schoolbus>(true, []);
  schoolbus: Schoolbus[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.loadSchoolbus();
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addSchoolbus() {
    this.router.navigateByUrl('schoolbus/add-schoolbus');
  }

  // ✅ API Call to fetch schoolbuses
  loadSchoolbus() {
    this.commonService.getSchoolbus().subscribe({
      next: (data:any) => {
        this.schoolbus = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error('Failed to load Schoolbus:', err);
        this.toastr.error('Failed to load Schoolbus', 'Error');
      }
    });
  }

  // ✅ Delete API
  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteSchoolbus(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Schoolbus deleted successfully', 'Success');
        this.loadSchoolbus(); // refresh list
      },
      error: (err: any) => {
        console.error('Failed to delete Schoolbus:', err);
        this.toastr.error('Failed to delete Schoolbus', 'Error');
      }
    });
  }

  // ✅ Edit Navigation
  edit(id: number) {
    this.router.navigate(['/schoolbus/edit-schoolbus', id]);
  }

  // ✅ Announce sort change for screen readers
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // ✅ Select all toggle
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: Schoolbus) => this.selection.select(row));
  }

  // ✅ Remove selected rows
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.schoolbus.findIndex((d: any) => d === item);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
      }
    });
    this.dataSource = new MatTableDataSource<Schoolbus>(this.schoolbus);
    this.selection = new SelectionModel<Schoolbus>(true, []);
  }
}
