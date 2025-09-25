import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListFees } from './list-fees/list-fees';
import { AddFees } from './add-fees/add-fees';
import { Fees } from './fees';

const routes: Routes = [
  {
      path:'',
      component: Fees,
      children: [
        {
          path: 'list-fees',
          component: ListFees
        },
        {
          path: 'add-fees',
          component: AddFees
        },
        {
          path: 'edit-fees/:id',
          component: AddFees
        },
        {
          path: '',
          redirectTo: 'list-fees',
          pathMatch: 'full'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesRoutingModule { }
