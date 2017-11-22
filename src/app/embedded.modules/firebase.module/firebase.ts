import {NgModule} from '@angular/core';
import {provideFB} from './providers';
import  * as firebase from 'firebase/app';

export type FireBaseInit = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    storageBucket: string,
    messagingSenderId?: string,
};

@NgModule()
export class FireBaseEModule {
    static  initAngularFB(init: FireBaseInit) {
        const FB: firebase.app.App = firebase.initializeApp(init);
        return {
            ngModule: FireBaseEModule,
            providers: provideFB(FB)
        };
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
