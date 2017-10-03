import { Injectable } from '@angular/core';

import  * as firebase from 'firebase/app';
import 'firebase/auth';
import Auth = firebase.auth.Auth;

@Injectable()
export class AuthService {
    public auth: any;
    constructor(
        private fb: firebase.app.App
    ) {
        this.auth = this.fb.auth();
    }
    /**
     * Firebase auth method to register user
     * @param {string} email
     * @param {string} pass
     * @return {Promise<Auth>}
     */
    signIn(email: string, pass: string): Promise<Auth> {
        return this.auth.createUserWithEmailAndPassword(email, pass);
    }
    /**
     * Firebase auth method to login user
     * @param {string} email
     * @param {string} pass
     * @return {Promise<Auth>}
     */
    logIn(email: string, pass: string): Promise<Auth> {
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    /**
     * Firebase auth method to logOut user.
     * @return {fPromise<Auth>}
     */
    logOut(): Promise<void> {
        return this.auth.signOut();
    }
    /**
     * Firebase auth method to reset password.
     * @param {string} email
     * @param a
     * @return {Promise<Auth>}
     */
    reset(email: string, ...a: Array<any>): Promise<Auth> {
        return this.auth.sendPasswordResetEmail(email);
    }
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
