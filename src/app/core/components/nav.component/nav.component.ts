import {Component, OnInit} from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {Flow} from 'monad-ts/src/flow';
import {Subject} from 'rxjs/Subject';

// Experimental approach to handle events in one component by handler (Observer) from another.
export const ADD_LIST_S$ = new Subject();

@Component({
    selector: 'nav-cmpnnt',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    constructor(
        protected store: Store<StateStore>
    ) {}
    ngOnInit() {    }
    // Example Flow.
    // Store.addAuth === true -> auth.component is visible f2f.component fields is invisible (Store.isVisible: false).
    addAuthDispatcher() {
        new Flow(this.store.manager().addAuth)
            .bind((v: any) => !v)
            .bind(v => {
                this.store.manager({addAuth: v, isVisible: !v});
            });
    };
    addListDispatcher ()  {
        this.store.manager({sideNav: false, addItem: {addListVisible: !this.store.manager().addItem.addListVisible}});
        ADD_LIST_S$.next(this.store.manager().addItem.addListVisible);
    }
    // Toggle sidenav.
    sideNavToggle() {
        this.store.manager({
            sideNav: !this.store.manager().sideNav,
            addItem: {addListVisible: false}
        })
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
