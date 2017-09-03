
import {AuthService} from './auth.em/auth.service/auth.service';
import {DBService} from './db.em/db.service/db.service';
import  * as firebase from 'firebase/app';

export function _authFBFactory(FB: firebase.app.App) {
    return new AuthService(FB);
}

export function _dbFBFactory(FB: firebase.app.App) {
    return new DBService(FB);
}

export function provideFB(FB: firebase.app.App) {
    return [
        {provide: AuthService, useFactory: _authFBFactory, deps: [FB]},
        {provide: DBService, useFactory: _dbFBFactory, deps: [FB]}
    ];
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
