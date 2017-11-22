import {ComponentFactoryResolver, QueryList, ViewContainerRef} from '@angular/core';

/**
 * Dinamically add component service functions.
 */

/**
 * Remove defined ViewContainerRef-s.
 * @param viewConts
 */
export function demolishSomeDA(...viewConts: Array<any>): void {
    viewConts.forEach((v, i) => {
        demolishDA(v[0], ...v.slice(1));
    });
}
/**
 * Remove one ViewContainerRef by id.
 * @param {Array<ViewContainerRef>} viewConts
 * @param {number} id
 */
export function demolishDA(viewConts: Array<ViewContainerRef>, ...id: Array<number>) {
    id.forEach((v) => {
        switch (true) {
            case(!viewConts[v]):
                break;
            default:
                viewConts[v].clear();
        }
    });
}
/**
 * Dinamically add component to another component.
 * @param {ComponentFactoryResolver} fRes
 * @param {QueryList<ViewContainerRef>} view
 * @param {number} id
 * @param comp
 */
export function dinamicallyAddCmpnnt(fRes: ComponentFactoryResolver, view: QueryList<ViewContainerRef>, id: number, comp: any) {
    if (id >= 0) {
        const container = view.toArray()[id];
        container.insert(fRes.resolveComponentFactory(comp).create(container.parentInjector).hostView);
    }
}
/**
 * Remove all defined ViewContainerRef-s.
 * @param {Array<ViewContainerRef>} viewConts
 */
export function demolishAllDACmpnnts( ...viewConts: Array<Array<ViewContainerRef>>) {
    viewConts.forEach((v) => {
        v.forEach((val: any) => {
            val.clear();
        });
    });
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
