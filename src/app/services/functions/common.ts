import {Renderer2} from '@angular/core';
import {DA} from '../monad.service/monad.service';
import {Store} from 'angust/src/store';
import {StateStore} from '../../configs/store/store.init';
import {demolishDA, demolishSomeDA} from './dinamically.add';

/**
 * Check path if it has elem. with given ID, propagate until `BODY` elem.
 * @param currEl
 * @param {RegExp} re
 * @param {Renderer2} rnr2
 * @return {number}
 */
export function checkPathElByID(currEl: any, re: RegExp, rnr2: Renderer2): number | undefined {
    let buff: number;
    function _l(el: any, reg: RegExp, r2: Renderer2): void {
        if (el.tagName !== 'BODY') {
            const currElID = el.id;
            if (currElID.match(reg)) {
                buff = +currElID.replace(reg, '');
            } else {
                _l(r2.parentNode(el), reg, r2);
            }
        }
    }
    _l(currEl, re, rnr2);
    return buff;
}

/**
 * Get data from LS by key.
 * @param {string} key
 * @return {any}
 */
export function getLSByKey(key: string) {
    return JSON.parse(localStorage.getItem(key));
}
/**
 * Remove used for adding/editing containers. Remove ViewContainerRef containers by id buffered in prevlistID, prevtaskID.
 * @param {DA} obj
 * @param {Store<StateStore>} store
 * @param {Function} fn
 */
export function removePrevCmpnnt(obj: DA, store: Store<StateStore>, fn: Function) {
    const prL = store.manager().addItem.prevlistID;
    if (prL < 0) {
    } else {
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
