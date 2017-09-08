import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventTargetLike} from 'rxjs/observable/FromEventObservable';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';
import {Subscription} from 'rxjs/Subscription';

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
    // ev[0] event name handled by cllbck[0] function.
    evFactory(target: EventTargetLike, ev: Array<string>, cllbck: Array<(x: any) => any>) {
        return ev.map((v, i, arr) => {
            return this.evHandler(target, v, cllbck[i])
        })
    }
    unsubsFactory(...subs: Array<Subscription>) {
        subs.forEach((v) => {
            v.unsubscribe();
        })
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
