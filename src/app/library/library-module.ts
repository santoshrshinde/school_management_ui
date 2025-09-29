import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { libraryRoutingModule } from './library-routing-module';
import { AddBook } from './add-book/add-book';
import { ListBook } from './list-book/list-book';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipInput, MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { FeesRoutingModule } from '../fees/fees-routing-module';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { library } from './library';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    library,
    AddBook,
    ListBook
    
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
    FeesRoutingModule,
    MatOptionModule,
    MatSelectModule,
    libraryRoutingModule,
    MatChipsModule,
    RouterModule
  ]
})
export class libraryModule { }
