import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {FirebaseError} from 'firebase/app';

@Injectable()
export class ErrorHandlerService {
    constructor() { }
     handleError (error: any) {
        console.error(error);
        return Observable.throw(error);
    }
    displayErrors(error: FirebaseError) {
        switch (error.code) {
            case 'auth/wrong-password':
                return 'The password is wrong.';
            case 'auth/invalid-email':
                return 'Enter valid email!';
            case 'auth/weak-password':
                return ('The password is too weak.');
            default:
                return error.message;
        }
    }
}
