import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentbusRoutingModule } from './studentbus-routing-module';
import { AddStudentbus } from './add-studentbus/add-studentbus';
import { ListStudentbus } from './list-studentbus/list-studentbus';
import { Studentbus } from './studentbus';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipInput } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AddStudentbus,
    ListStudentbus,
    Studentbus
  ],
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipInput,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSortModule,
    StudentbusRoutingModule
  ]
})
export class StudentbusModule { }
