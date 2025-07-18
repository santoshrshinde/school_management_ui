import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [App]
})
export class AppRoutingModule { }
