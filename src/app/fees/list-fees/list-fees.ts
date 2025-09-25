import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface Fees {
  FeesID: number;
  Amount: number;
  DueDate: string;      // 'yyyy-MM-dd' format from API
  StudentID: number;
  PaidAmount: number;
  TotalFee: number;
  StudentName?: string; // extra for table display
}

@Component({
  selector: 'app-list-fees',
  standalone: false,
  templateUrl: './list-fees.html',
  styleUrls: ['./list-fees.sass'],
})
export class ListFees implements AfterViewInit {
  // 👇 MUST match matColumnDef in HTML
  displayedColumns: string[] = [
    'No',
    'Amount',
    'DueDate',
    'PaidAmount',
    'StudentName',
    'TotalFee',
    'Action'
  ];

  dataSource = new MatTableDataSource<Fees>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Fees>(true, []);
  fees: Fees[] = [];

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

  addFees() {
    this.router.navigateByUrl('/fees/add-fees');
  }

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
      },
    });
  }

  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteFees(id).subscribe({
      next: () => {
        this.toastr.success('Fees deleted successfully', 'Success');
        this.loadFees(); // refresh
      },
      error: (err: any) => {
        console.error('Failed to delete Fees:', err);
        this.toastr.error('Failed to delete Fees', 'Error');
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['/fees/edit-fees', id]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index = this.fees.findIndex(d => d.FeesID === item.FeesID);
      if (index > -1) this.fees.splice(index, 1);
    });
    this.dataSource.data = [...this.fees];
    this.selection.clear();
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
