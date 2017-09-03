import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Page404Component} from './core/components/page.404.component/page.404.component';
import {AppWrapperComponent} from './core/components/app.wrapper.component/app.wrapper.component';

const ROUTES: Routes = [
    { path: '', redirectTo: '/lists',  pathMatch: 'full'},
    { path: 'lists', component: AppWrapperComponent },
    { path: '**', component: Page404Component }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { useHash: true }
            // , { enableTracing: true }
            )
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
