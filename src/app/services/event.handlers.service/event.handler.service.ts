import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventTargetLike} from 'rxjs/observable/FromEventObservable';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class EventHandlerService {
    private options = { passive: true };
    constructor(
        private ehs: ErrorHandlerService
    ) { }
    /**
     * Set event listener.
     * @param {EventTargetLike} target
     * @param {string} event
     * @param {(arg: any) => void} callbackFN
     * @return {Subscription}
     */
    evHandler(target: EventTargetLike, event: string, callbackFN: (arg: any) => void) {
        return Observable.fromEvent(target, event, this.options).subscribe(
            callbackFN,
            (err: Error) => this.ehs.handleError(err)
        );
    }
    /**
     * Event factory. Event with name ev[0] handled by cllbck[0] function.
     * @param {EventTargetLike} target
     * @param {Array<string>} ev
     * @param {Array<(x: any) => any>} cllbck
     * @return {Subscription[]}
     */
    evFactory(target: EventTargetLike, ev: Array<string>, cllbck: Array<(x: any) => any>) {
        return ev.map((v, i) => {
            return this.evHandler(target, v, cllbck[i])
        })
    }
    /**
     * Unsubscription factory.
     * @param {Subscription} subs
     */
    unsubsFactory(...subs: Array<Subscription>) {
        subs.forEach((v) => {
            v.unsubscribe();
        })
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
