import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import Database = firebase.database.Database;
import {ErrorM} from 'monad-ts/src/error';
import 'firebase/database';

@Injectable()
export class DBService {
    public db: Database;
    protected err: ErrorM<any>;
    constructor(
        protected fb: firebase.app.App
    ) {
        this.db = this.fb.database();
        this.err = new ErrorM();
    }
    /**
     * Execute  some of firebase.database methods. Ex-s in DB.service.ts
     * @param args
     * @return {firebase.Promise<any> | Error}
     */
    dbDispatcher(...args: Array<any>): firebase.Promise<any> {
        return this.err.bind((v: any) => this.db[v[0]](v[1])[v[2]](v[3]), args);
    }
    goOffline(): void {
        this.db.goOffline();
    }
    goOnline(): void {
        this.db.goOnline();
    }
    // // Get data from database.
    // getDataByPath(path: string): any {
    //     return this.db.ref(path).on('value', (dss) => {
    //         return dss.val();
    //     });
    // }
    // getAllData(path: string): firebase.Promise<any> {
    //     return this.db.ref(path).once('value');
    // }
    // setData(data: JSON, path: string): firebase.Promise<any> {
    //     return this.db.ref(path).set(data);
    // }
    // removeData(path: string): firebase.Promise<any> {
    //     return this.db.ref(path).remove();
    // }
    // updateData(data: typeof Object, path: string): firebase.Promise<any> {
    //     return this.db.ref(path).update({...data});
    // }
    checkConnection() {
        return this.db.ref('.info/connected').on('value', (dss) => {
            return dss.val();
        });
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
