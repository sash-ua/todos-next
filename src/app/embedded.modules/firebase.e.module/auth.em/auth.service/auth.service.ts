import { Injectable } from '@angular/core';

import  * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
    public auth: any;
    constructor(
        protected fb: firebase.app.App
    ) {
        this.auth = this.fb.auth();
    }
    /**
     * Firebase auth method to register user
     * @param {string} email
     * @param {string} pass
     * @return {firebase.Promise<any>}
     */
    signIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.createUserWithEmailAndPassword(email, pass);
    }
    /**
     * Firebase auth method to login user
     * @param {string} email
     * @param {string} pass
     * @return {firebase.Promise<any>}
     */
    logIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    /**
     * Firebase auth method to logOut user.
     * @return {firebase.Promise<void>}
     */
    logOut(): firebase.Promise<void> {
        return this.auth.signOut();
    }
    /**
     * Firebase auth method to reset password.
     * @param {string} email
     * @param a
     * @return {firebase.Promise<any>}
     */
    reset(email: string, ...a: Array<any>): firebase.Promise<any> {
        return this.auth.sendPasswordResetEmail(email);
    }
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
