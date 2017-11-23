import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './nav.component/nav.component';
import {MainComponent} from './main.component/main.component';
import {AppWrapperComponent} from './app.wrapper.component/app.wrapper.component';
import {SideNavComponent} from './sidenav.component/sidenav.component';
import {MaterialModule} from '../../embedded.modules/material.module/material.module';
import {SharedModule} from '../../shared/shared.module';
import {AuthModule} from '../auth.module/auth.module';
import {WidgetModule} from '../widget.module/widget.module';

@NgModule({
 imports: [
     CommonModule,
     MaterialModule,
     SharedModule,
     AuthModule,
     WidgetModule
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
export class AppInterfaceModule { }



// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
