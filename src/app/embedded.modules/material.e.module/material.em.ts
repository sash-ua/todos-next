import { NgModule } from '@angular/core';
import {
    MatButtonModule, MatInputModule, MatSidenavModule, MatIconModule, MatCheckboxModule, MatDatepickerModule,
    MatNativeDateModule, MatButton, MatRaisedButtonCssMatStyler, MatButtonCssMatStyler, MatIcon, MatMiniFab, MatCheckbox
} from '@angular/material';


@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatInputModule,
        MatButton,
        MatRaisedButtonCssMatStyler,
        MatButtonCssMatStyler,
        MatIcon,
        MatMiniFab,
        MatCheckbox,
        MatSidenavModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [],
    providers: [
        MatNativeDateModule
    ],
})
export class MaterialEModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
