import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from './services/';
import { MaterialModule } from './modules/material.module';
import { ModalDeleteComponent } from './directives/modal-delete/modal-delete.component';
import { ListNoticesComponent } from './directives/list-notices/list-notices.component';
import { AddNoticeComponent } from './directives/add-notice/add-notice.component';

@NgModule({
  declarations: [ModalDeleteComponent, ListNoticesComponent, AddNoticeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    ...Services
  ],
  entryComponents:[
    ModalDeleteComponent
  ],
  exports:[
    MaterialModule
  ]
  
})
export class SharedModule {

 }
