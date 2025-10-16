import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookIssue } from './book-issue';
import { ListBookIssue } from './list-book-issue/list-book-issue';
import { AddBookIssue } from './add-book-issue/add-book-issue';

const routes: Routes = [
  {
    path: '',
    component: BookIssue,
    children: [
      {
        path: 'list-book-issue',
        component: ListBookIssue
      },
      {
        path: 'add-book-issue',
        component: AddBookIssue
      },
      {
        path: 'edit-book-issue/:id',
        component: AddBookIssue
      },
      {
        path: '',
        redirectTo: '/list-book-issue',  // ← Redirect to default child route
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookIssueRoutingModule { }
