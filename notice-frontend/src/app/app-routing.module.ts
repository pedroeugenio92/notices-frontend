import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListNoticesComponent } from './shared/directives/list-notices/list-notices.component';
import { AddNoticeComponent } from './shared/directives/add-notice/add-notice.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListNoticesComponent,
  },
  {
    path: 'add',
    component: AddNoticeComponent,
  },
  {
    path: 'add/:id',
    component: AddNoticeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
