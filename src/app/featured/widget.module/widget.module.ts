import { NgModule } from '@angular/core';
import {ActionComponent} from './action.component/action.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';

@NgModule({
 imports: [
     CommonModule,
     MaterialModule
 ],
 exports: [
     ActionComponent
 ],
 declarations: [
     ActionComponent
 ],
 providers: [],
})
export class WidgetModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
