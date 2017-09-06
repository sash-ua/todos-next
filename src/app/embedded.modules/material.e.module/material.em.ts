import { NgModule } from '@angular/core';
import {
    MdProgressSpinner, MdInputModule, MdProgressSpinnerModule,
    MdButtonModule, MdButton, MdDialogModule, MdTooltipModule, MdTooltip,
    MdRaisedButtonCssMatStyler, MdButtonCssMatStyler, MdProgressSpinnerCssMatStyler, MdCardModule, MdIconModule,
    MdMiniFab, MdTextareaAutosize, MdIcon, MdCheckboxModule, MdCheckbox, MdDatepickerModule, MdDatepicker, MdDatepickerToggle,
    MdNativeDateModule
} from '@angular/material';


@NgModule({
    imports: [
        // MdDialogModule,
        MdInputModule,
        // MdProgressSpinnerModule,
        MdButtonModule,
        // MdCardModule,
        MdIconModule,
        MdCheckboxModule,
        MdDatepickerModule,
        MdNativeDateModule
    ],
    exports: [
        // MdProgressSpinner,
        // MdProgressSpinnerCssMatStyler,
        MdInputModule,
        MdButton,
        MdRaisedButtonCssMatStyler,
        MdButtonCssMatStyler,
        MdIcon,
        MdMiniFab,
        MdCheckbox,
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
