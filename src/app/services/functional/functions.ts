
import {Renderer2} from '@angular/core';

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
export function toggleBoolean(v: boolean): boolean {
    return !v;
}
// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
