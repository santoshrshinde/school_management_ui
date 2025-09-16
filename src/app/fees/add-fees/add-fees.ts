import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fees } from '../fees';

@Component({
  selector: 'app-add-fees',
  standalone: false,
  templateUrl: './add-fees.html',
  styleUrls: ['./add-fees.sass']
})
export class AddFees implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  feeId: number | null = null;

  fees: Fees = {
    FeeID: 0,
    StudentID: 0,
    Amount: 0,
    DueDate: '',
    PaidAmount: 0,
    TotalFee: 0
  };

  students: any[] = []; // ✅ Student list for dropdown

  ngOnInit(): void {
    // ✅ Load Students
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Failed to load students', err);
      }
    });

    // ✅ Load Fee if editing
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.feeId = +params['id'];
        this.loadFeesDetails(this.feeId);
      }
    });
  }

  loadFeesDetails(id: number) {
    this.commonService.getFeesById(id).subscribe({
      next: (data: any) => {
        this.fees = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load fees details', err);
        this.toastr.error('Failed to load fees details', 'Error');
      }
    });
  }

  save() {
    if (this.feeId) {
      this.commonService.updateFees(this.feeId, this.fees).subscribe({
        next: () => {
          this.toastr.success('Fees updated successfully', 'Success');
          this.router.navigateByUrl('/fees');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to update fees', 'Error');
        }
      });
    } else {
      this.commonService.saveFees(this.fees).subscribe({
        next: () => {
          this.toastr.success('Fees added successfully', 'Success');
          this.router.navigateByUrl('/fees');
        },
        error: (err) => {
          console.error('Error', err);
          this.toastr.error('Failed to add fees', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/fees');
  }
}
