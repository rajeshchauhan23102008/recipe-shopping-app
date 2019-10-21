import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap';

import { DropdownDirective } from './dropdown.directive';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [DropdownDirective, LoaderComponent, AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    DropdownDirective,
    LoaderComponent,
    AlertComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule
  ]
})
export class SharedModule {}
