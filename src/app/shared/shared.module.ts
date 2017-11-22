import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UniversalComponent} from './universal.form.component/universal.component';
import {Page404Component} from './page.404.component/page.404.component';
import {MaterialModule} from '../embedded.modules/material.module/material.module';
import {MdlWindowComponent} from './mdl.window.component/mdl.window.component';
import {OverlayComponent} from './overlay.component/overlay.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    declarations: [
        UniversalComponent,
        Page404Component,
        MdlWindowComponent,
        OverlayComponent
    ],
    exports: [
        UniversalComponent,
        Page404Component,
        MdlWindowComponent,
        OverlayComponent
    ],
providers: [],
})
export class SharedModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.

