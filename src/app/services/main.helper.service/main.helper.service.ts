import {ComponentFactoryResolver, Injectable, ViewContainerRef, QueryList} from '@angular/core';
import {demolishDA, demolishSomeDA, dinamicallyAddCmpnnt} from '../DA.service/da.service';
import {Store} from 'angust/src/store';
import {List, StateStore} from '../../configs/store/store.init';
import {ErrorM} from 'monad-ts/src/error';
import {Either} from 'monad-ts/src/either';
import {FormBuilder} from '@angular/forms';

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
        protected store: Store<any>,
        protected  factoryResolver: ComponentFactoryResolver,
        private fb: FormBuilder,
    ) {
    }
    /**
     * FormGroup init. with given config.
     * @param {Object} cnfg
     * @param {boolean} edit
     * @return {FormGroup}
     */
    initFG(cnfg: Object, edit = false) {
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
     * Example of Either monad.
     * @param data
     * @param {CondFn} cond
     * @return {Pr<Error> | Error}
     */
    trnsfrmr1(data: any, cond: CondFn) {
        return new ErrorM().bind((v: any) => new Either(
                (z: any) => {
                    this._side(z, 'rSide');
                },
                (z: any) => {
                    this._side(z, 'lSide');
                },
            ).bind(cond,  v),
            data
        );
    }
    /**
     * Example of Either monad.
     * @param data
     * @param {CondFn} cond
     * @return {Pr<Error> | Error}
     */
    trnsfrmr2(data: any, ...cond: Array<CondFn>) {
        return new ErrorM()
            .bind((v: any) => new Either(
                ((d: any) => {
                    this.trnsfrmr1(d, cond[1])}
                ),

                (d: any) => {
                    this._side(d, 'thSide');
                }
            )
                    .bind(cond[0], v),
                data);
    }
    _side(d: any, side: string) {
        d.side = d[side];
        this.dispatcher(d);
    }
}
/**
 * Remove used for add/edit containers. Remove ViewContainerRef containers by id buffered in prevlistID, prevtaskID.
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
