import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { Users } from './users';
import { AddUser } from './add-user/add-user';

const routes: Routes = [
  {
    path:'',
    component: Users,
    children: [
      {
        path: 'user-list',
        component: UserList
      },
      {
        path: 'add-user',
        component: AddUser
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
