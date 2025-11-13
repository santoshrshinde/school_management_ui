import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTimeTable } from './list-timetable/list-timetable';
import { AddTimetable } from './add-timetable/add-timetable';
import { Timetable } from './timetable';

const routes: Routes = [ {
      path:'',
      component: Timetable,
      children: [
        {
          path: 'list-timetable',
          component: ListTimeTable
        },
        {
          path: 'add-timetable',
          component: AddTimetable
        },
        {
          path: 'edit-timetable/:id',
          component: AddTimetable
        },
        {
          path: '',
          redirectTo: 'list-timetable',
          pathMatch: 'full'
        }
      ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
