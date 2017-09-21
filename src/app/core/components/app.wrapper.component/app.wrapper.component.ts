import { Component } from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';

@Component({
    selector: 'app-cmpnnt',
    template:
    `<sidenav-cmpnnt></sidenav-cmpnnt>
     <nav-cmpnnt></nav-cmpnnt>
    `
})

export class AppWrapperComponent {
    constructor(
        private store: Store<StateStore>
    ) { }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
