import {ComponentFactoryResolver, Injectable, ViewContainerRef, QueryList} from '@angular/core';
import {demolishDA, demolishSomeDA, dinamicallyAddCmpnnt} from '../DA.service/da.service';
import {Store} from 'angust/src/store';
import {List, StateStore} from '../../configs/store/store.init';
import {ErrorM} from 'monad-ts/src/error';
import {Either} from 'monad-ts/src/either';
import {FormBuilder} from '@angular/forms';
import {Maybe} from 'monad-ts/src/maybe';
import {getLSByKey} from '../functional/functions';
import {ErrorHandlerService} from '../error.handler.service/error.handler.service';

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
export class MainHelperService {
    constructor(
        private store: Store<any>,
        private  factoryResolver: ComponentFactoryResolver,
        private fb: FormBuilder,
        private err: ErrorHandlerService,
    ) {
    }
    /**
     * FormGroup init. with given config.
     * @param {Object} cnfg
     * @return {FormGroup}
     */
    initFG(cnfg: Object) {
        return this.fb.group(cnfg);
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
            const ID = obj.taskID >= 0 ? getTaskQntt(obj.listID, this.store) + obj.taskID : obj.listID;
            dinamicallyAddCmpnnt(this.factoryResolver, obj.side.containers, ID, obj.side.addTypeCmpnnt);
        }
    }
    /**
     * Example of Monad transformer. Get Right, Left functions, data and condition function,
     * if cond `true` execute Right func if `false` Left func, then if error handle it.
     * @param errMsg
     * @param data
     * @param {CondFn} cond
     * @return {Pr<Error> | Error}
     */
    trnsfrmr1(errMsg: string, data: any, cond: CondFn) {
        return new Either(
            x => this.err.handleError(`${errMsg}-${x}`),
            x => x
        ).bind(
            (e: any) => e instanceof  ErrorM,
            new ErrorM().bind((v: any) => new Either(
                (z: any) => {
                    this._side(z, 'rSide');
                },
                (z: any) => {
                    this._side(z, 'lSide');
                },
            ).bind(cond,  v),
                data
            )
        )
    }
    /**
     * Example of Monad transformer.
     * @param errMsg
     * @param data
     * @param {CondFn} cond
     * @return {Pr<Error> | Error}
     */
    trnsfrmr2(errMsg: string, data: any, ...cond: Array<CondFn>) {
        return new Either(
            x => this.err.handleError(`${errMsg}-${x}`),
            x => x
        ).bind(
            (e: any) => e instanceof  ErrorM,
            new ErrorM()
            .bind(
                (v: any) => new Either(
                    ((d: any) => {
                        this.trnsfrmr1(errMsg, d, cond[1])}
                    ),
                    (d: any) => {
                        this._side(d, 'thSide');
                    }
                )
                    .bind(
                        cond[0], v),
                        data
            )
        )
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
     * Monad transformer. Get data from LS, if there's data then start initApp() func or if it get `null` do nothing
     * or if error it throw it and handle.
     * @param key
     * @param {string} errMsg
     * @param {Function} execfn
     * @return {any}
     */
    initTrnsfrmr(key: any, errMsg: string, execfn: Function): any {
        console.log('trans');
        return new Either(
            x => this.err.handleError(`${errMsg}-${x}`),
            x => x
        ).bind(
            (e: any) => e instanceof  ErrorM,
            new ErrorM().bind(
                (v: any) => new Maybe().bind(
                    (d: any) => execfn(d),
                    v
                ),
                getLSByKey(key)
            )
        )
    }
}

/**
 * Remove used for adding/editing containers. Remove ViewContainerRef containers by id buffered in prevlistID, prevtaskID.
 * @param {DA} obj
 * @param {Store<StateStore>} store
 * @param {Function} fn
 */
export function removePrevCmpnnt(obj: DA, store: Store<StateStore>, fn: Function) {
    const prL = store.manager().addItem.prevlistID;
    if (prL >= 0) {
        demolishSomeDA(
            [obj.add.toArray(), prL],
            [obj.editList.toArray(), prL],
            [obj.editTask.toArray(), prL]);
        const prT = store.manager().addItem.prevtaskID;
        if (prT >= 0) {
            demolishDA(obj.editTask.toArray(), fn(prL, store) + prT);
        }
    }
}
/**
 * Get Task quantity in all Lists before given List by ID.
 * @param {number} listID
 * @param {Store<StateStore>} store
 * @return {number}
 */
export function getTaskQntt(listID: number, store: Store<StateStore>): number {
    let b = 0, i = 0;
    while (i < listID) {
        b += store.manager().data[i].tasks.length;
        i++;
    }
    return b;
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
