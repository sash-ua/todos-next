import { Injectable } from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../configs/store/store.init';
import {DBService} from '../../embedded.modules/firebase.module/db.service/db.service';

@Injectable()
export class LocDBService {
    constructor(
        private store: Store<StateStore>,
        private db: DBService
    ) { }
    /**
     * Save to DataBase by path.
     * @param {Lists | Array<List>} data
     * @param {string} path
     */
    saveToDB(data: any, path = '') {
        if (this.store.manager().connected) {
            this.db.dbDispatcher('ref', `/${this.store.manager().connected}/${path}`, 'set', data);
        }
    }
    /**
     * Update DataBase by path
     * @param {Object} data
     * @param {string} path
     */
    updateDB(data: Object, path = '') {
        if (this.store.manager().connected) {
            this.db.dbDispatcher('ref', `/${this.store.manager().connected}/${path}`, 'update', data);
        }
    }
    getAllData(userId: string) {
        return this.db.dbDispatcher('ref', '/' + userId, 'once', 'value');
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
