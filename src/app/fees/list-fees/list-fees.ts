import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Fees } from '../fees';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-fees',
  standalone: false,
  templateUrl: './list-fees.html',
  styleUrls: ['./list-fees.sass']
})
export class ListFees implements AfterViewInit {
  // ✅ API ke sath match kiya
  displayedColumns: string[] = ['Amount', 'DueDate', 'PaidAmount', 'StudentName', 'TotalFee', 'Action'];

  dataSource = new MatTableDataSource<Fees>([]);
  selection = new SelectionModel<Fees>(true, []);
  fees: Fees[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.loadFees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Navigate to Add Fees
  addFees() {
    this.router.navigateByUrl('/fees/add-fees');
  }

  // ✅ API Call to fetch fees list
  loadFees() {
    this.commonService.getFees().subscribe({
      next: (data: any) => {
        this.fees = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error('Failed to load Fees:', err);
        this.toastr.error('Failed to load Fees', 'Error');
      }
    });
  }

  // ✅ Delete Fees
  delete(feeId: number) {
    console.log('Deleting FeeID:', feeId);
    this.commonService.deleteFees(feeId).subscribe({
      next: () => {
        this.toastr.success('Fees deleted successfully', 'Success');
        this.loadFees(); // refresh list
      },
      error: (err: any) => {
        console.error('Failed to delete Fees:', err);
        this.toastr.error('Failed to delete Fees', 'Error');
      }
    });
  }

  // ✅ Edit Fees
  edit(feeId: number) {
    this.router.navigate(['/fees/edit-fees', feeId]);
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
      : this.dataSource.data.forEach((row: Fees) => this.selection.select(row));
  }

  // ✅ Remove selected rows (from UI only)
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.fees.findIndex((d: any) => d === item);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
      }
    });
    this.dataSource = new MatTableDataSource<Fees>(this.fees);
    this.selection = new SelectionModel<Fees>(true, []);
  }
}
