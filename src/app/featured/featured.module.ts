import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {NavComponent} from './nav.component/nav.component';
import {MainComponent} from './main.component/main.component';
import {SideNavComponent} from './sidenav.component/sidenav.component';
import {MaterialModule} from '../embedded.modules/material.module/material.module';
import {AppWrapperComponent} from './app.wrapper.component/app.wrapper.component';
import {SharedModule} from '../shared/shared.module';
import {FormsComponentsModule} from './forms.components.module/forms.components.module';
import {WidgetModule} from './widget.module/widget.module';
import {AuthModule} from './auth.module/auth.module';

@NgModule({
    imports: [
        CommonModule,
        FormsComponentsModule,
        WidgetModule,
        AppRoutingModule,
        MaterialModule,
        SharedModule,
        AuthModule
    ],
    exports: [
        NavComponent,
        MainComponent,
        AppWrapperComponent,
        SideNavComponent
    ],
    declarations: [
        NavComponent,
        MainComponent,
        AppWrapperComponent,
        SideNavComponent
    ],
    providers: [],
})
export class FeaturedModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
