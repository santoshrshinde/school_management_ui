import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { library } from './library';
import { ListBook } from './list-book/list-book';
import { AddBook } from './add-book/add-book';

const routes: Routes = [
    {
        path:'',
        component: library,
        children: [
          {
            path: 'list-book',
            component: ListBook
          },
          {
            path: 'add-book',
            component: AddBook
          },
          {
            path: 'edit-book/:id',
            component: AddBook
          },
          {
            path: '',
            redirectTo: 'list-book',
            pathMatch: 'full'
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class libraryRoutingModule { }
