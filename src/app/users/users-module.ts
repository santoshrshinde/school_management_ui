import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing-module';
import { Users } from './users';
import { UserList } from './user-list/user-list';
import { AddUser } from './add-user/add-user';


@NgModule({ 
  declarations: [
    Users,
    UserList,
    AddUser
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
})
export class UsersModule { }
