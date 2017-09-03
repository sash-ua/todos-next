import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import Database = firebase.database.Database;
import {Identity} from 'monad-ts/src/identity';
import {ErrorM} from 'monad-ts/src/error';

@Injectable()
export class DBService {
    public db: Database;
    protected i: Identity<any>;
    protected err: ErrorM<any>;
    constructor(
        protected fb: firebase.app.App
    ) {
        this.db = fb.database();
        this.i = new Identity();
        this.err = new ErrorM();
    }
    dbDispatcher(fn: string, path: string, ...args: Array<any>) {
        return this.err.bind(this.i.bind(this.db.ref, path)[fn], [...args]);
    }
    goOffline(): void {
        this.db.goOffline();
    }
    goOnline(): void {
        this.db.goOnline();
    }
    // Get data from database.
    getDataByPath(path: string): any {
        return this.db.ref(path).on('value', (dss) => {
            return dss.val();
        });
    }
    getAllData(path: string): firebase.Promise<any> {
        return this.db.ref(path).once('value');
    }
    setData(data: JSON, path: string): firebase.Promise<any> {
        return this.db.ref(path).set(data);
    }
    removeData(path: string): firebase.Promise<any> {
        return this.db.ref(path).remove();
    }
    // TODO Should be data JSON obj. only?
    updateData(data: typeof Object, path: string): firebase.Promise<any> {
        return this.db.ref(path).update({...data});
    }
    checkConnection() {
        return this.db.ref('.info/connected').on('value', (dss) => {
            return dss.val();
        });
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
