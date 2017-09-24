import {Renderer2} from '@angular/core';

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
    console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
