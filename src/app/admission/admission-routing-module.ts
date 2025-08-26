import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Admission } from './admission';
import { ListAdmission } from './list-admission/list-admission';
import { AddAdmission } from './add-admission/add-admission';

const routes: Routes = [
  {
    path: '',
    component: Admission,
    children: [
      {
        path: 'admission-list',
        component: ListAdmission
      },
      {
        path: 'add-admission',
        component: AddAdmission
      },
      {
        path: 'edit-admission/:id',
        component: AddAdmission
      },
      {
        path: '',
        redirectTo: 'admission-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
