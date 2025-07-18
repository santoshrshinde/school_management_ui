import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
     
    {
        path: 'users',
        loadChildren: () => import('./users/users-module').then((mod) => mod.UsersModule)
    },
    {
        path: '',
        redirectTo: '/users',
        pathMatch: 'full'
    },
    { path: '**', component: NotFound },
];
