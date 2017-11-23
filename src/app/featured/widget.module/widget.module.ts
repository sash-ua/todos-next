import { NgModule } from '@angular/core';
import {ActionComponent} from './action.component/action.component';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';
import {CopyTaskComponent} from './copy.task.component/copy.task.component';
import {FoldingListComponent} from './folding.list.component/folding.list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TaskFormComponent} from './task.form.component/task.form.component';
import {ListFormComponent} from './list.form.component/list.form.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        ActionComponent,
        CopyTaskComponent,
        FoldingListComponent,
        TaskFormComponent,
        ListFormComponent
    ],
    declarations: [
        ActionComponent,
        CopyTaskComponent,
        FoldingListComponent,
        TaskFormComponent,
        ListFormComponent
    ],
    providers: [],
    entryComponents: [
        TaskFormComponent,
        ListFormComponent
    ]
})
export class WidgetModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
