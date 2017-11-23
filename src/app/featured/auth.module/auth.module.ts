import { NgModule } from '@angular/core';
import {AuthComponent} from './auth.component/auth.component';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';
import {CommonModule} from '@angular/common';
import {AuthFormValidationComponent} from './auth.form.validation.component/auth.form.validation.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
 imports: [
     CommonModule,
     MaterialModule,
     SharedModule
 ],
 exports: [
     AuthComponent,
     AuthFormValidationComponent
 ],
 declarations: [
     AuthComponent,
     AuthFormValidationComponent
 ],
 providers: [],
})
export class AuthModule { }


// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
