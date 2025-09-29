import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing-module';
import { AddFees } from './add-fees/add-fees';
import { ListFees } from './list-fees/list-fees';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipInput } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Fees } from './fees';


@NgModule({
  declarations:[
    AddFees,
    ListFees,
    Fees
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipInput,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatSelectModule,
    FeesRoutingModule,
]
})
export class FeesModule { }
