import {ComponentFactoryResolver, QueryList, ViewContainerRef} from '@angular/core';

// Dinamically added component service

// Remove defined ViewContainerRef-s.
export function demolishSomeDA(...viewConts: Array<any>): void {
    viewConts.forEach((v, i) => {
        demolishDA(v[0], ...v.slice(1));
    });
}
// Remove one ViewContainerRef by id.
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
// Dinamically add component to another component.
export function dinamicallyAddCmpnnt(fRes: ComponentFactoryResolver, view: QueryList<ViewContainerRef>, id: number, comp: any) {
    console.log(view);
    if (id >= 0) {
        const container = view.toArray()[id];
        container.insert(fRes.resolveComponentFactory(comp).create(container.parentInjector).hostView);
    }
}
// Remove all defined ViewContainerRef-s
export function demolishAllDACmpnnts( ...viewConts: Array<Array<ViewContainerRef>>) {
    viewConts.forEach((v) => {
        v.forEach((val: any) => {
            val.clear();
        });
    });
}

// Copyright (c) 2017 Alex Tranchenko. All rights reserved.
