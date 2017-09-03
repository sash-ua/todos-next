import {Component, OnInit} from '@angular/core';
import {toggleBoolean} from '../../../services/functional/functions';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {Flow} from 'monad-ts/src/flow';

@Component({
    selector: 'nav-cmpnnt',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent implements OnInit {
    constructor(
        protected store: Store<StateStore>
    ) {}
    ngOnInit() {}
    // Example Flow.
    // Store.addAuth === true -> auth.component is visible f2f.component fields is invisible (Store.isVisible: false).
    addAuthDispatcher() {
        new Flow(this.store.manager().addAuth)
            .bind((v: any) => toggleBoolean(v))
            .bind(v => {
                this.store.manager({addAuth: v, isVisible: !v});
            });
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
