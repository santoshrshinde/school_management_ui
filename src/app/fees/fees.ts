import { Component } from '@angular/core';

@Component({
  selector: 'app-fees',
  standalone: false,
  templateUrl: './fees.html',
  styleUrl: './fees.sass'
})
export class Fees {
 FeeID: number;
  StudentID: number;
  Amount: number;
  DueDate: string;   // ya Date
  PaidAmount: number;
  TotalFee: number;

   constructor() {
    this.FeeID = 0;
    this.StudentID = 0;
    this.Amount = 0;
    this.DueDate = '';
    this.PaidAmount = 0;
    this.TotalFee = 0;
  }
}
