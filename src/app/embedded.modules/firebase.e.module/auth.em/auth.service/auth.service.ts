import { Injectable } from '@angular/core';

import  * as firebase from 'firebase/app';
import Auth = firebase.auth.Auth;

@Injectable()
export class AuthService {
    private auth: Auth;
    constructor(
        fb: firebase.app.App
    ) {
        this.auth = fb.auth();
    }
    signIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.createUserWithEmailAndPassword(email, pass);
    }
    logIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    logOut(): firebase.Promise<void> {
        return this.auth.signOut();
    }
    reset1stage(code: string, newPass: string): firebase.Promise<any> {
        return this.auth.confirmPasswordReset(code, newPass);
    }
    reset0stage(email: string): firebase.Promise<any> {
        return this.auth.sendPasswordResetEmail(email);
    }
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
