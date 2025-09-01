import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Schoolbus } from './schoolbus';
import { ListSchoolbus } from './list-schoolbus/list-schoolbus';
import { AddSchoolbus } from './add-schoolbus/add-schoolbus';

const routes: Routes = [
  {
      path:'',
      component: Schoolbus,
      children: [
        {
          path: 'list-schoolbus',
          component: ListSchoolbus
        },
        {
          path: 'add-schoolbus',
          component: AddSchoolbus
        },
        {
          path: 'edit-schoolbus/:id',
          component: AddSchoolbus
        },
        {
          path: '',
          redirectTo: 'list-schoolbus',
          pathMatch: 'full'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolbusRoutingModule { }
