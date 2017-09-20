import { Injectable } from '@angular/core';
import {Store} from 'angust/src/store';
import {StateStore} from '../../configs/store/store.init';
import {DBService} from '../../embedded.modules/firebase.e.module/db.em/db.service/db.service';

@Injectable()
export class LocDBService {

 constructor(
     protected store: Store<StateStore>,
     protected db: DBService
 ) { }
    saveToDB() {
        if (this.store.manager().connected) {
            this.db.dbDispatcher('ref', '/' + this.store.manager().connected, 'set', JSON.stringify(this.store.manager().data))
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
