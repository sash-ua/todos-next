import {AuthService} from './auth.em/auth.service/auth.service';
import {DBService} from './db.em/db.service/db.service';
import  * as firebase from 'firebase/app';
import {InjectionToken} from '@angular/core';
import {FireBaseInit} from './firebase.em';

/**
 * Factory function for class AuthService.
 * @param {firebase.app.App} FB
 * @return {AuthService}
 * @private
 */
export function _authFBFactory(FB: firebase.app.App) {
    return new AuthService(FB);
}

/**
 * Factory function for class DBService.
 * @param {firebase.app.App} FB
 * @return {DBService}
 * @private
 */
export function _dbFBFactory(FB: firebase.app.App) {
    return new DBService(FB);
}
/**
 * Creates a token that can be used in a DI Provider.
 * @type {InjectionToken}
 * @private
 */
export const _INITIAL_STATE = new InjectionToken<FireBaseInit>('FB');

/**
 * DI Provider function.
 * @param {firebase.app.App} FB
 * @return {[{provide: AuthService; useFactory: ((FB: firebase.app.App) => AuthService); deps: [InjectionToken<FireBaseInit>]} , {provide: DBService; useFactory: ((FB: firebase.app.App) => DBService); deps: [InjectionToken<FireBaseInit>]} , {provide: InjectionToken<FireBaseInit>; useValue: firebase.app.App}]}
 */
export function provideFB(FB: firebase.app.App) {
    return [
        {provide: AuthService, useFactory: _authFBFactory, deps: [_INITIAL_STATE]},
        {provide: DBService, useFactory: _dbFBFactory, deps: [_INITIAL_STATE]},
        {provide: _INITIAL_STATE, useValue: FB}
    ];
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
