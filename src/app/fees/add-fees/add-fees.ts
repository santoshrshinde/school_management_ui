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
  fees:any={
    FeesID:'',
    Amount:'',
    DueDate:'',
    StudentID:'',
    PaidAmount:'',
    TotalFee:''

  }

  feeId: number | null = null;
  
  students: any[] = [];

  ngOnInit(): void {
    // Load all students for dropdown
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        this.students= data;
      },
      error: (err) => {
        console.error('Failed to load students', err);
        this.toastr.error('Failed to load students', 'Error');
      }
    });

    // Check if editing an existing fee
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
      // Update existing Fees
      this.commonService.updateFees(this.feeId, this.fees).subscribe({
        next: () => {
          this.toastr.success('Fees updated successfully', 'Success');
          this.router.navigateByUrl('/fees');
        },
        error: (err) => {
          console.error('Error', err);
          this.toastr.error('Failed to update fees', 'Error');
        }
      });
    } else {
      // Add new Fees
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
