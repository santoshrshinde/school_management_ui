import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing-module';
import { AddTimetable } from './add-timetable/add-timetable';
import { ListTimetable } from './list-timetable/list-timetable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipInput } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Timetable } from './timetable';


@NgModule({
  declarations: [
    Timetable,
    AddTimetable,
    ListTimetable
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
     MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,      
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatChipInput,
    MatCardModule,
    MatCheckboxModule,
    TimetableRoutingModule
  ]
})
export class TimetableModule { }
