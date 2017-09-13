import {Component} from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';

@Component({
 selector: 'sidenav-cmpnnt',
 templateUrl: 'sidenav.component.html',
 styleUrls: ['sidenav.component.css']
})

export class SideNavComponent {
 constructor(
     protected store: Store<StateStore>
 ) {}
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
