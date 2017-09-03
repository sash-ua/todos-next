import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './components/auth.component/auth.component';
import {SharedModule} from '../shared/shared.module';
import {NavComponent} from './components/nav.component/nav.component';
import {MainComponent} from './components/main.component/main.component';
import {AuthFormValidationComponent} from './components/f2f.validation.component/auth.form.validation.component';
import {TaskFormComponent} from '../shared/components/forms.component/task.form.component/task.form.component';
import {ListFormComponent} from '../shared/components/forms.component/list.form.component/list.form.component';
import {Page404Component} from './components/page.404.component/page.404.component';
import {AppWrapperComponent} from './components/app.wrapper.component/app.wrapper.component';
import {AppRoutingModule} from '../app.routing.module';
import {MainHelperService} from '../services/main.helper.service/main.helper.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        SharedModule,
        AuthComponent,
        Page404Component,
        NavComponent,
        MainComponent,
        AuthFormValidationComponent,
        AppWrapperComponent
    ],
    declarations: [
        AuthComponent,
        Page404Component,
        NavComponent,
        MainComponent,
        AuthFormValidationComponent,
        AppWrapperComponent
    ],
    entryComponents: [
        TaskFormComponent,
        ListFormComponent
    ],
    providers: [
        MainHelperService
    ],
})
export class CoreModule {}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
