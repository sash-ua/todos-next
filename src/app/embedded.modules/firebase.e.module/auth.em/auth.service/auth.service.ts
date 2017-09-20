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
    signIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.createUserWithEmailAndPassword(email, pass);
    }
    logIn(email: string, pass: string): firebase.Promise<any> {
        return this.auth.signInWithEmailAndPassword(email, pass);
    }
    logOut(): firebase.Promise<void> {
        return this.auth.signOut();
    }
    reset2(code: string, newPass: string): firebase.Promise<any> {
        return this.auth.confirmPasswordReset(code, newPass);
    }
    reset(email: string, ...a: Array<any>): firebase.Promise<any> {
        return this.auth.sendPasswordResetEmail(email);
    }
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
