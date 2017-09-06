import { NgModule } from '@angular/core';
import {
    MdProgressSpinner, MdInputContainer, MdInputModule, MdProgressSpinnerModule,
    MdInputDirective, MdButtonModule, MdButton, MdDialogModule, MdTooltipModule, MdTooltip,
    MdRaisedButtonCssMatStyler, MdButtonCssMatStyler, MdProgressSpinnerCssMatStyler, MdCardModule, MdIconModule,
    MdMiniFab, MdTextareaAutosize, MdIcon, MdCheckboxModule, MdCheckbox
} from '@angular/material';


@NgModule({
    imports: [
        // MdTooltipModule,
        // MdDialogModule,
        MdInputModule,
        // MdProgressSpinnerModule,
        MdButtonModule,
        // MdCardModule,
        MdIconModule,
        MdCheckboxModule
    ],
    exports: [
        // MdProgressSpinner,
        // MdProgressSpinnerCssMatStyler,
        MdInputContainer,
        MdInputDirective,
        MdTextareaAutosize,
        MdButton,
        MdRaisedButtonCssMatStyler,
        MdButtonCssMatStyler,
        // MdTooltip,
        // MdCardModule,
        MdIcon,
        MdMiniFab,
        MdCheckbox
    ],
    declarations: [],
    providers: [],
})
export class MaterialEModule { }


// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
