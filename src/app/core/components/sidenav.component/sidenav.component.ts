import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {MdSidenavModule} from '@angular/material';

@Component({
 selector: 'sidenav-cmpnnt',
 templateUrl: 'sidenav.component.html',
 styleUrls: ['sidenav.component.css']
})

export class SideNavComponent implements OnInit {
 constructor(
     protected store: Store<StateStore>
 ) {}

 ngOnInit() { }
    test(ev: any) {
        console.log(ev);
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
