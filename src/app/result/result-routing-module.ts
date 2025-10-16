import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Result } from './result';
import { ListResult } from './list-result/list-result';
import { AddResult } from './add-result/add-result';

const routes: Routes = [ {
    path:'',
    component: Result,
    children: [
      {
        path: 'list-result',
        component: ListResult
      },
      {
        path: 'add-result',
        component: AddResult
      },
      {
        path: 'edit-result/:id',
        component: AddResult
      },
      {
        path: '',
        redirectTo: 'list-result',
        pathMatch: 'full'
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
