import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialEModule} from '../embedded.modules/material.e.module/material.em';
import {MdlWindowComponent} from './components/mdl.window.component/mdl.window.component';
import {ActionComponent} from './components/action.component/action.component';
import {UniversalComponent} from './components/forms.component/universal.form.component/universal.component';
import {TaskFormComponent} from './components/forms.component/task.form.component/task.form.component';
import {OverlayComponent} from './components/overlay.component/overlay.component';
import {ListFormComponent} from './components/forms.component/list.form.component/list.form.component';

@NgModule({
 imports: [
     CommonModule,
     FormsModule,
     MaterialEModule,
     ReactiveFormsModule
 ],
 exports: [
     MaterialEModule,
     MdlWindowComponent,
     ActionComponent,
     UniversalComponent,
     TaskFormComponent,
     OverlayComponent,
     ListFormComponent
 ],
 declarations: [
     MdlWindowComponent,
     ActionComponent,
     UniversalComponent,
     TaskFormComponent,
     OverlayComponent,
     ListFormComponent
 ],
 providers: [],
})
export class SharedModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.

