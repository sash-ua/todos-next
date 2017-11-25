import {Component} from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../../configs/store/store.init';
import {LocDBService} from '../../../core/DB.service/DB.service';

@Component({
    selector: 'sidenav-cmpnnt',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css']
})

export class SideNavComponent {
    constructor(
        private store: Store<StateStore>,
        private ldb: LocDBService
    ) {}
    /**
     * Set theme and save to firebase.
     * @param themeData
     */
    setTheme (themeData: any) {
        this.store.manager({theme: themeData});
        this.ldb.updateDB(themeData, 'theme');
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
