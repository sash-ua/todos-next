import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventTargetLike} from 'rxjs/observable/FromEventObservable';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';

@Injectable()
export class EventHandlerService {
    constructor(
        protected ehs: ErrorHandlerService
    ) { }
    evHandler(target: EventTargetLike, event: string, callbackFN: (arg: any) => void) {
        return Observable.fromEvent(target, event).subscribe(
            callbackFN,
            (err: Error) => this.ehs.handleError(err)
        );
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
