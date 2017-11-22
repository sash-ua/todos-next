import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';
import {SharedModule} from '../../shared/shared.module';
import {TaskFormComponent} from './task.form.component/task.form.component';
import {ListFormComponent} from './list.form.component/list.form.component';
import {AuthFormValidationComponent} from './f2f.validation.component/auth.form.validation.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule
    ],
    exports: [
        AuthFormValidationComponent,
        TaskFormComponent,
        ListFormComponent
    ],
    declarations: [
        AuthFormValidationComponent,
        TaskFormComponent,
        ListFormComponent
    ],
    providers: [],
    entryComponents: [
        TaskFormComponent,
        ListFormComponent
    ]
})
export class FormsComponentsModule {
}



// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
