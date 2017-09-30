import {Component} from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {Flow} from 'monad-ts/src/flow';
import {Subject} from 'rxjs/Subject';

// #Experimental approach to handle events in one component by handler (Observer) from another.
export const ADD_LIST_S$ = new Subject();

@Component({
    selector: 'nav-cmpnnt',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})
export class NavComponent {
    constructor(
        private store: Store<StateStore>
    ) {}
    /**
     * #Example of Flow.
     * Store.addAuth === true -> auth.component is visible AuthFormValidationComponent fields is invisible (Store.isVisible: false).
     */
    addAuthDispatcher() {
        new Flow(this.store.manager().addAuth)
            .bind((v: any) => !v)
            .bind(v => {
                this.store.manager({addAuth: v, isVisible: !v, overlayOn: v, addItem: {addListVisible: !v}});
            });
    };
    /**
     * Add list dispatcher. Change app's state and puts Observable into Subject. Observer is in MainComponent. #Experimental.
     * When function invoked Observer get Observable and execute MainComponent.addDispatcher().
     */
    addListDispatcher ()  {
        this.store.manager({
            sideNav: false,
            addAuth: false,
            addItem: {addListVisible: !this.store.manager().addItem.addListVisible, listID: undefined}
        });
        ADD_LIST_S$.next(this.store.manager().addItem.addListVisible);
    }
    /**
     * Toggle sidenav.
     */
    sideNavToggle() {
        this.store.manager({
            sideNav: !this.store.manager().sideNav,
            addItem: {addListVisible: false}
        })
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
