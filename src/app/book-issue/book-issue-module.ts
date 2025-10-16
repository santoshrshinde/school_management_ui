import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookIssueRoutingModule } from './book-issue-routing-module';
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
import { BookIssue } from './book-issue';
import { AddBookIssue } from './add-book-issue/add-book-issue';
import { ListBookIssue } from './list-book-issue/list-book-issue';


@NgModule({
  declarations: [
    BookIssue,
    AddBookIssue,
    ListBookIssue
  ],
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,      
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatChipInput,
    MatCardModule,
    MatCheckboxModule,
    BookIssueRoutingModule
  ]
})
export class BookIssueModule { }
