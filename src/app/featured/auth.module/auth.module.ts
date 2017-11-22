import { NgModule } from '@angular/core';
import {AuthComponent} from './auth.component/auth.component';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';
import {CommonModule} from '@angular/common';
import {FormsComponentsModule} from '../forms.components.module/forms.components.module';

@NgModule({
 imports: [
     CommonModule,
     MaterialModule,
     FormsComponentsModule
 ],
 exports: [
     AuthComponent
 ],
 declarations: [
     AuthComponent
 ],
 providers: [],
})
export class AuthModule { }


// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
