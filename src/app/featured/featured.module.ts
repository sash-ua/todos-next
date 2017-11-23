import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app.routing.module';
import {MaterialModule} from '../embedded.modules/material.module/material.module';
import {SharedModule} from '../shared/shared.module';
import {WidgetModule} from './widget.module/widget.module';
import {AuthModule} from './auth.module/auth.module';
import {AppInterfaceModule} from './app.interface.module/app.interface.module';

@NgModule({
    imports: [
        CommonModule,
        WidgetModule,
        AppRoutingModule,
        MaterialModule,
        SharedModule,
        AuthModule,
        AppInterfaceModule
    ],
    exports: [    ],
    declarations: [    ],
    providers: [],
})
export class FeaturedModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
