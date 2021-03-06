import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorHandlerService {
    constructor() { }
     handleError (error: any) {
        console.error(error);
        return Observable.throw(error);
    }
}
