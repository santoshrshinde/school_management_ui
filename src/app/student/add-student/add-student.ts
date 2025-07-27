import { Component, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.html',
  styleUrl: './add-student.sass'
})
export class AddStudent {
  private commonService = inject(Common);
  private router = inject(Router);
  student: any = {
    Name: '',
    DateOfBirth: '',
    Address: '',
  }

  
  save() {
    console.log(this.student);
    this.commonService.saveStudent(this.student).subscribe({
      next: (value) => {
        this.router.navigateByUrl('/student');
        
      },
      error(err) {
        console.log('Error', err);
      }
    });
  }
  cancel() {
    this.router.navigateByUrl('/student');
  }
}
