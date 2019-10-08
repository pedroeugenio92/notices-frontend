import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Services } from './services/';
import { Directives } from './directives/';
import { MaterialModule } from './modules/material.module';
import { ModalDeleteComponent } from './directives/modal-delete/modal-delete.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...Directives
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    ...Services
  ],
  entryComponents:[
    ModalDeleteComponent
  ],
  exports:[
    ...Directives,
    MaterialModule
  ]
  
})
export class SharedModule {}
