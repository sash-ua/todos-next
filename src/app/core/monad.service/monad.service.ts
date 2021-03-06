import {ComponentFactoryResolver, Injectable, ViewContainerRef, QueryList} from '@angular/core';
import {Store} from 'angust/src/store';
import {List, StateStore} from '../../configs/store/store.init';
import {ErrorM} from 'monad-ts/src/error';
import {Either} from 'monad-ts/src/either';
import {Maybe} from 'monad-ts/src/maybe';
import {getTaskQntt, removePrevCmpnnt} from '../functions/common';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';
import {dinamicallyAddCmpnnt} from '../functions/dinamically.add';

export type DA = {add: QueryList<ViewContainerRef>, editList: QueryList<ViewContainerRef>, editTask: QueryList<ViewContainerRef>};
export type AddEditArgs = {
    // Current list ID.
    listID: number,
    // Current task ID.
    taskID: number,
    // Current list data.
    listCurr: List,
    // Containers where component can be dynamically added.
    da: DA  | undefined,
    // Validity status.
    f2fFormStatus: boolean,
    side: Side
};
export type Side = {
    // Component to add.
    addTypeCmpnnt?: any,
    // Specific containers where component should be dynamically added.
    containers?: QueryList<ViewContainerRef> | undefined,
    // Data saved to Store.
    toStoreData?: any,
    // Function to execute.
    fn?: Function,
};
export type CondFn = (x: any) => boolean;

@Injectable()
export class MonadService {
    constructor(
        private store: Store<StateStore>,
        private factoryResolver: ComponentFactoryResolver,
        private err: ErrorHandlerService,
    ) {
    }
    /**
     * ErrorM-Either monad transformer.
     * @param {string} errMsg
     * @param data
     * @param execfn
     * @param {Function} trnsfrmrFn - Transformation function.
     * @return {boolean | Pr<any> | Error}
     */
    errorEitherT(data: any, execfn: any, errMsg: string, trnsfrmrFn: Function) {
        return new Either(
            x => this.err.handleError(`${errMsg}-${x}`),
            x => x
        ).bind(
            (e: any) => e instanceof  ErrorM,
            new ErrorM().bind(
                v => trnsfrmrFn(v, execfn, errMsg),
                data
            )
        )
    }
    /**
     * Transformation function from Maybe monad.
     * @param data
     * @param {Function} execfn
     * @return {Pr<any>}
     */
    maybe (data: any, execfn: Function) {
        return new Maybe().bind(
            (d: any) => execfn(d),
            data
        )
    }
    /**
     * Get data, if there's data then start `execfn` func or if it get `null` do nothing or if error it throw it and handle.
     * @param data
     * @param {(v?: any) => any} execfn
     * @param {string} errMsg
     * @return {any}
     */
    maybeErrorEitherT(data: any, execfn: (v?: any) => any, errMsg: string): any {
        return this.errorEitherT(data, execfn, errMsg, this.maybe);
    }
    /**
     * Transformation function from either monad.
     * @param data
     * @param {CondFn} execfn
     * @return {boolean | Pr<any> | Error}
     */
    either(data: any, execfn: CondFn) {
        return new Either(
            (z: any) => {
                this._side(z, 'rSide');
            },
            (z: any) => {
                this._side(z, 'lSide');
            },
        ).bind(execfn,  data)
    }
    /**
     * Get Right, Left functions, data and condition function, if cond `true` execute Right func if `false` Left func,
     * then if error - handle it.
     * @param data
     * @param {CondFn} cond
     * @param {string} errMsg
     * @return {boolean | Pr<any> | Error}
     */
    eitherErrorEitherT(data: any, cond: CondFn, errMsg: string) {
        return this.errorEitherT(data, cond, errMsg, this.either.bind(this));
    }
    /**
     * Transformation function based on either monad and eitherErrorEitherT transformer.
     * @param data
     * @param {Array<CondFn>} execfn
     * @param {string} errMsg
     * @return {boolean | Pr<any> | Error}
     */
    eitherT(data: any, execfn: Array<CondFn>, errMsg: string) {
        return new Either(
            (z: any) => {
                return this.eitherErrorEitherT(z, execfn[1], errMsg);
            },
            (z: any) => {
                this._side(z, 'thSide');
            },
        ).bind(execfn[0],  data)
    }
    /**
     * Example of either-either-error-either-error-either monad transformer.
     * @param {string} errMsg
     * @param data
     * @param {CondFn} cond
     * @return {boolean | Pr<any> | Error}
     */
    eitherEitherErrorEitherT(errMsg: string, data: any, ...cond: Array<CondFn>) {
        return this.errorEitherT(data, cond, errMsg, this.eitherT.bind(this));
    }
    /**
     * Assign to executed section (`side`) of the data object (`d`) data from the `sideName` section of `d` and launch this.dispatcher(d).
     * @param d - data object.
     * @param {string} sideName
     * @private
     */
    _side(d: any, sideName: string) {
        d.side = d[sideName];
        this.dispatcher(d);
    }
    /**
     * It execute defined or not functions depends on given configuration.
     * @param {AddEditArgs} obj
     */
    dispatcher(obj: AddEditArgs): void {
        if (obj.da) {
            removePrevCmpnnt(obj.da, this.store, getTaskQntt);
        }
        if (obj.side.toStoreData) {
            this.store.manager(obj.side.toStoreData);
        }
        if (obj.side.fn) {
            obj.side.fn(obj);
        }
        if (obj.side.addTypeCmpnnt) {
            dinamicallyAddCmpnnt(
                this.factoryResolver,
                obj.side.containers,
                obj.taskID >= 0 ? getTaskQntt(obj.listID, this.store) + obj.taskID : obj.listID,
                obj.side.addTypeCmpnnt
            );
        }
    }
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
