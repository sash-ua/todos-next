import { Component } from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';

@Component({
    selector: 'app-cmpnnt',
    template:
    `
        <nav-cmpnnt></nav-cmpnnt>
        <div class="wrapper wrapper__window">
         <mdl-window *ngIf="store.manager().mdlWindow"></mdl-window>
        </div>
        <main-cmpnnt></main-cmpnnt>
    `,
    styles: ['.wrapper__window {text-align: center;}']
})

export class AppWrapperComponent {
    constructor(
        private store: Store<StateStore>
    ) { }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
