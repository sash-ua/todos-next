import { NgModule } from '@angular/core';
import {
    MdInputModule, MdButtonModule, MdButton, MdRaisedButtonCssMatStyler, MdButtonCssMatStyler, MdIconModule, MdMiniFab, MdIcon,
    MdCheckboxModule, MdCheckbox, MdDatepickerModule, MdNativeDateModule, MdSidenavModule,
} from '@angular/material';


@NgModule({
    imports: [
        MdInputModule,
        MdButtonModule,
        MdSidenavModule,
        MdIconModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    exports: [
        MdInputModule,
        MdButton,
        MdRaisedButtonCssMatStyler,
        MdButtonCssMatStyler,
        MdIcon,
        MdMiniFab,
        MdCheckbox,
        MdSidenavModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    declarations: [],
    providers: [
        MdNativeDateModule
    ],
})
export class MaterialEModule { }

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
